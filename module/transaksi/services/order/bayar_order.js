import { DB } from "../../../../config/database/connections.js";
import {
  STATUS_ORDER,
  STATUS_ORDER_TEXT,
} from "../../../../helpers/constants/constansStatusOrder.js";
import {
  DataNotFoundError,
  errorInFunction,
  ValidationError,
} from "../../../../helpers/error/index.js";
import order from "../../models/order.model.js";

export const bayarOrder = async ({
  id_order,
  status = STATUS_ORDER.DIBAYAR,
}) => {
  try {
    const cek_status = await order.findByPk(id_order);
    if (!cek_status) {
      throw new DataNotFoundError({ message: "data order tidak ditemukan" });
    }
    if (cek_status.status !== STATUS_ORDER.KUNCI) {
      throw new ValidationError({
        message: `tidak bisa ngupdate status order ke bayar karena status order sekrang adalah ${
          STATUS_ORDER_TEXT[cek_status.status]
        }`,
      });
    }
    const [update_order, data] = await Promise.all([
      order.update({ status }, { where: { id_order } }),
      DB.queryString(`WITH data AS (
      SELECT
            mp.id_product,
            mk.id_kategori,
            mk.nama_kategori,
            mp.nama_product,
            mv.nama_variant,
            od.qty AS jumlah,
            'Tanpa Promo' as promo_status
        FROM
            master.ms_product mp
        LEFT JOIN master.ms_variant mv 
            ON mp.id_variant = mv.id_variant
            AND mv."deletedAt" IS NULL
        JOIN master.ms_kategori mk 
            ON mp.id_kategori = mk.id_kategori
            AND mk."deletedAt" IS NULL
        JOIN transaksi.order_detail od 
            ON od.id_product = mp.id_product
        WHERE
            od.id_order = ${id_order}
        UNION
        SELECT
            mp.id_product,
            mk.id_kategori,
            mk.nama_kategori,
            mp.nama_product,
            mv.nama_variant,
            od.qty AS jumlah,
            'Dengan Promo' as promo_status
        FROM
            master.ms_product mp
        LEFT JOIN master.ms_variant mv 
            ON mp.id_variant = mv.id_variant
            AND mv."deletedAt" IS NULL
        JOIN master.ms_kategori mk 
            ON mp.id_kategori = mk.id_kategori
            AND mk."deletedAt" IS NULL
        JOIN transaksi.ms_product_promo mpp 
            ON mpp.id_product = mp.id_product
        JOIN master.ms_promo mp2 
            ON mp2.id_promo = mpp.id_promo
        JOIN transaksi.order_detail od 
            ON od.id_promo = mp2.id_promo
        WHERE
            od.id_order = ${id_order}
    )
    SELECT
        msp.nama_station_printer AS nama_printer,
        json_agg(
            json_build_object(
                'nama_product', d.nama_product,
                'variant', d.nama_variant,
                'jumlah', d.jumlah,
                'promo_status', d.promo_status
            )
        ) AS products
    FROM
        data d
    JOIN master.kategori_station_printer ksp 
        ON ksp.id_kategori = d.id_kategori
    JOIN master.ms_station_printer msp 
        ON msp.id_station_printer = ksp.id_station_printer
    GROUP BY
        msp.nama_station_printer;
    `),
    ]);
    if (update_order[0] == 0) {
      throw new errorInFunction({ message: "gagal update pembayaran" });
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

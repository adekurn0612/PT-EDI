import { DB } from "../../../../config/database/connections.js";

export const getDetail = async () => {
  try {
    const data = await DB.queryString(`SELECT
						p.no_ktp,
						p.id_user,
						p.agama,
						u.nama_lengkap,
						p.tempat_lahir,
						p.tanggal_lahir,
						p.jenis_kelamin,
						p.golongan_darah,
						p.alamat_ktp,
						p.alamat_ktp_id_provinsi,
						mp2.nama AS alamat_ktp_provinsi,
						p.alamat_ktp_id_kota,
						mk2.nama AS alamat_ktp_kota,
						p.alamat_ktp_id_kecamatan,
						mkk2.nama AS alamat_ktp_kecamatan,
						p.alamat_ktp_id_kelurahan,
						ml.nama as alamat_ktp_kelurahan,
						p.alamat_domisili,
						p.alamat_domisili_id_provinsi,
						mp.nama AS alamat_domisili_provinsi,
						p.alamat_domisili_id_kota,
						mk.nama AS alamat_domisili_kota,
						p.alamat_domisili_id_kecamatan,
						mkk.nama AS alamat_domisili_kecamatan,
						p.alamat_domisili_id_kelurahan,
						ml2.nama as alamat_domisili_kelurahan,
						p.no_telpon,
						p.status,
						p.nama_kontak_darurat,
						p.nomor_kontak_darurat,
						p.expected_salary,
						p.is_relocation,
						COALESCE(
						json_agg(DISTINCT jsonb_build_object(
							'nama_perusahaan', rp.nama_perusahaan,
							'posisi_terakhir', rp.posisi_terakhir,
							'tahun', rp.tahun,
							'pendapatan_terakhir', rp.pendapatan_terakhir
						)) FILTER (WHERE rp.id_user IS NOT NULL), '[]'
						) AS riwayat_pekerjaan,
						COALESCE(
						json_agg(DISTINCT jsonb_build_object(
							'nama_jenjang_pendidikan', rpe.nama_jenjang_pendidikan,
							'nama_jurusan', rpe.nama_jurusan,
							'nama_instutusi_akademik', rpe.nama_institusi_akademik,
							'tahun_lulus', rpe.tahun_lulus,
							'ipk', rpe.ipk
						)) FILTER (WHERE rpe.id_user IS NOT NULL), '[]'
						) AS riwayat_pendidikan,
						COALESCE(
						json_agg(DISTINCT jsonb_build_object(
							'nama_pelatihan', rpl.nama_pelatihan,
							'is_sertifikat', rpl.is_sertifikat,
							'tahun', rpl.tahun
						)) FILTER (WHERE rpl.id_user IS NOT NULL), '[]'
						) AS riwayat_pelatihan
					FROM
						master.profile p
					JOIN manajemen_akses.users u ON
						u.id_user = p.id_user
						AND u."deletedAt" IS NULL
					LEFT JOIN master.ms_provinsi mp ON
						mp.id_provinsi = p.alamat_domisili_id_provinsi
						AND mp."deletedAt" IS NULL
					LEFT JOIN master.ms_provinsi mp2 ON
						mp2.id_provinsi = p.alamat_ktp_id_provinsi
						AND mp2."deletedAt" IS NULL
					LEFT JOIN master.ms_kota mk ON
						mk.id_kota = p.alamat_domisili_id_kota
						AND mk."deletedAt" IS NULL
					LEFT JOIN master.ms_kota mk2 ON
						mk2.id_kota = p.alamat_ktp_id_kota
						AND mk2."deletedAt" IS NULL
					LEFT JOIN master.ms_kecamatan mkk ON
						mkk.id_kecamatan = p.alamat_domisili_id_kecamatan
						AND mkk."deletedAt" IS NULL
					LEFT JOIN master.ms_kecamatan mkk2 ON
						mkk2.id_kecamatan = p.alamat_ktp_id_kecamatan
						AND mkk2."deletedAt" IS NULL
					LEFT JOIN master.ms_kelurahan ml ON
						ml.id_kelurahan = p.alamat_domisili_id_kelurahan
						AND ml."deletedAt" IS NULL
					LEFT JOIN master.ms_kelurahan ml2 ON
						ml2.id_kelurahan = p.alamat_ktp_id_kelurahan
						AND ml2."deletedAt" IS NULL
					LEFT JOIN transaksi.riwayat_pekerjaan rp ON
						rp.id_user = p.id_user
					LEFT JOIN transaksi.riwayat_pendidikan rpe ON
						rpe.id_user = p.id_user
					LEFT JOIN transaksi.riwayat_pelatihan rpl ON
						rpl.id_user = p.id_user
					GROUP BY
						p.no_ktp, u.nama_lengkap, p.tempat_lahir, p.tanggal_lahir, p.jenis_kelamin, p.golongan_darah, 
						p.alamat_ktp, p.alamat_ktp_id_provinsi, mp2.nama, p.alamat_ktp_id_kota, mk2.nama, 
						p.alamat_ktp_id_kecamatan, mkk2.nama, p.alamat_domisili, p.alamat_domisili_id_provinsi, 
						mp.nama, p.alamat_domisili_id_kota, mk.nama, p.alamat_domisili_id_kecamatan, mkk.nama, 
						p.no_telpon, p.nama_kontak_darurat, p.nomor_kontak_darurat , p.id_user , p.agama , p.expected_salary , p.is_relocation,
						p.alamat_ktp_id_kelurahan,p.alamat_domisili_id_kelurahan , ml.nama , ml2.nama , p.status
					`);

    return data[0];
  } catch (error) {
    throw error;
  }
};

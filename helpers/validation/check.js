import { ValidationError, errorInFunction } from "./../error/index.js";
import { CHECKCONTSTANTS } from "./check.constants.js";
import ArrayOfObjectValidation from "./array_of_object.js";

class Check {
  static async multiple_check_stringvar({ array }) {
    let callback = [];
    try {
      if (!array || !array?.length) {
        callback.push({
          key: null,
          message: `Maaf, terdapat array yang tidak terdefinisi. Pastikan anda memasukan informasi dengan format yang benar.`,
        });
      } else if (array?.filter((itm) => !itm.variable_name).length > 0) {
        callback.push({
          key: null,
          message: `Maaf, terdapat variable name yang tidak terdefinisi. Pastikan anda memasukan informasi dengan format yang benar.`,
        });
      } else {
        const filterRegex = /^[A-Z_]{1,50}$/;
        for (let i = 0; i < array.length; i++) {
          const currentItem = array[i];
          switch (currentItem.method) {
            case CHECKCONTSTANTS.STRING:
              if (
                currentItem.key === "" ||
                currentItem.key === null ||
                currentItem.key === undefined
              ) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, ${currentItem.variable_name} tidak boleh kosong. Pastikan Anda telah melengkapi semua informasi yang diperlukan.`,
                });
              }
              break;
            case CHECKCONTSTANTS.DEFINED:
              if (currentItem.key === undefined) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, ${currentItem.variable_name} tidak terdefinisi. Pastikan anda memasukan informasi dengan format yang benar.`,
                });
              }
              break;
            case CHECKCONTSTANTS.STANDAR_KODE:
              if (
                currentItem.key === "" ||
                currentItem.key === null ||
                currentItem.key === undefined ||
                filterRegex.test(currentItem.key.toUpperCase()) === false
              ) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, sepertinya kode kosong atau tidak sesuai standar , kode hanya boleh mengandung hurup kapital 'A-Z' dan tanda '_'. Pastikan anda memasukan informasi dan format yang benar.`,
                });
              }
              break;
            case CHECKCONTSTANTS.STATUS:
              if (
                ![
                  1,
                  0,
                  true,
                  false,
                  2,
                  3,
                  "0",
                  "1",
                  "2",
                  "3",
                  "true",
                  "false",
                  99,
                  "99",
                ].includes(currentItem.key) &&
                currentItem.key !== "" &&
                currentItem.key !== null &&
                currentItem.key !== undefined
              ) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, ${currentItem.variable_name} bukan format status. Pastikan anda memasukan informasi dengan format yang benar.`,
                });
              }
              break;
            case CHECKCONTSTANTS.RESOURCE:
              if (
                currentItem.key === "" ||
                currentItem.key === null ||
                currentItem.key === undefined
              ) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf sebelum melanjutkan silahkan pilih data yang akan dilakukan ${currentItem.variable_name}  atau refresh halaman untuk memperbarui pilihan`,
                });
              }
              break;
            case CHECKCONTSTANTS.NUMBER:
              if (
                isNaN(currentItem.key) ||
                typeof currentItem.key !== "number"
              ) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, format  ${currentItem.variable_name} harus berupa number . `,
                });
              }
              break;
            case CHECKCONTSTANTS.ENUM: {
              let cek = false;
              for (let j = 0; j < currentItem.enum.length; j++) {
                if (
                  currentItem.enum[j] === currentItem.key &&
                  currentItem.key !== "" &&
                  currentItem.key !== null &&
                  currentItem.key !== undefined
                ) {
                  cek = true;
                }
              }
              if (!cek) {
                const enumLength = currentItem.enum.length;
                if (enumLength > 1)
                  currentItem.enum[enumLength - 1] =
                    " dan " + currentItem.enum[enumLength - 1];
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, data ${
                    currentItem.variable_name
                  } tidak valid , Pastikan nilai berupa salah satu dari ${currentItem.enum.toString()}.`,
                });
              }
              break;
            }
            case CHECKCONTSTANTS.DELETED:
              if (
                ![0, "0"].includes(currentItem.key) &&
                currentItem.key !== "" &&
                currentItem.key !== null &&
                currentItem.key !== undefined
              ) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, ${currentItem.variable_name} bukan format deleted. Pastikan anda memasukan informasi dengan format yang benar.`,
                });
              }
              break;
            case CHECKCONTSTANTS.BOOLEAN:
              if (typeof currentItem.key !== "boolean") {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, ${currentItem.variable_name} harus format boolean. Pastikan anda memasukan informasi dengan format yang benar.`,
                });
              }
              break;
            case CHECKCONTSTANTS.ARRAY:
              if (
                !Array.isArray(currentItem.key) ||
                currentItem.key.length < 1
              ) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, ${currentItem.variable_name} bukan format array. Pastikan anda memasukan informasi dengan format yang benar.`,
                });
              }
              break;
            case CHECKCONTSTANTS.JSON:
              if (typeof currentItem.key !== "object") {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, ${currentItem.variable_name} harus format JSON. Pastikan anda memasukan informasi dengan format yang benar.`,
                });
              }
              break;
            case CHECKCONTSTANTS.ARRAY_OF_OBJECT: {
              // mengubah key dan value menjadi array
              const objFormats = ArrayOfObjectValidation.object_to_keys_values(
                currentItem.object_format
              );
              const stringObjV = objFormats.map((objF) => {
                return `${objF.key} bertipe ${objF.value}`;
              });
              if (!Array.isArray(currentItem.key)) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Input ${
                    currentItem.variable_name
                  } harus format JSON array of object. Pastikan setiap object harus memiliki key ${stringObjV.toString()}.`,
                });
              } else if (currentItem.key.length <= 0) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Input ${
                    currentItem.variable_name
                  } harus bertipe array of object.Pastikan setiap object harus memiliki key ${stringObjV.toString()}`,
                });
              } else {
                // lanjutkan pengecekan setiap object
                // cek apakah jumlah key setiap objek sama dengan format
                const isSame =
                  ArrayOfObjectValidation.check_length_of_keys_is_same_in_objects(
                    currentItem.key,
                    currentItem.object_format
                  );
                console.log(isSame);
                if (!isSame) {
                  callback.push({
                    key: currentItem.key || currentItem.variable_name,
                    message: `Input ${
                      currentItem.variable_name
                    }, jumlah key pada salah satu atau beberapa object tidak sama dengan format. Pastikan setiap object harus memiliki key ${stringObjV.toString()}`,
                  });
                } else if (
                  ArrayOfObjectValidation.check_type_of_keys_in_objects(
                    currentItem.key,
                    currentItem.object_format
                  ).length > 0
                ) {
                  // cek tipe data setiap element apakah sama
                  callback.push({
                    key: currentItem.key || currentItem.variable_name,
                    message: `Input ${
                      currentItem.variable_name
                    }, key pada salah satu atau beberapa object tidak sama dengan format . Pastikan setiap object harus memiliki key ${stringObjV.toString()}`,
                  });
                }
              }

              break;
            }

            case CHECKCONTSTANTS.MIN_MAX:
              if (currentItem.key.min > currentItem.key.max) {
                callback.push({
                  key: currentItem.key || currentItem.variable_name,
                  message: `Maaf, ${currentItem.variable_name.min} tidak boleh lebih besar dari ${currentItem.variable_name.max}.`,
                });
              }
              break;
            default:
              callback.push({
                key: currentItem.key || currentItem.variable_name,
                message: `Maaf, Method ${currentItem.variable_name} tidak sesuai, Silahkan hubungi tim administrator. `,
              });
              break;
          }
        }
      }
      if (callback.length > 0) {
        throw new ValidationError({
          data: callback,
          message: "Validasi error",
        });
      }
    } catch (error) {
      console.log("error di check", error);
      throw error;
    }
  }

  static terbilang(angka) {
    const bilne = [
      "",
      "satu",
      "dua",
      "tiga",
      "empat",
      "lima",
      "enam",
      "tujuh",
      "delapan",
      "sembilan",
      "sepuluh",
      "sebelas",
    ];

    if (angka < 12) {
      return bilne[angka];
    } else if (angka < 20) {
      return this.terbilang(angka - 10) + " belas";
    } else if (angka < 100) {
      return (
        this.terbilang(Math.floor(parseInt(angka) / 10)) +
        " puluh " +
        this.terbilang(parseInt(angka) % 10)
      );
    } else if (angka < 200) {
      return "seratus " + this.terbilang(parseInt(angka) - 100);
    } else if (angka < 1000) {
      return (
        this.terbilang(Math.floor(parseInt(angka) / 100)) +
        " ratus " +
        this.terbilang(parseInt(angka) % 100)
      );
    } else if (angka < 2000) {
      return "seribu " + this.terbilang(parseInt(angka) - 1000);
    } else if (angka < 1000000) {
      return (
        this.terbilang(Math.floor(parseInt(angka) / 1000)) +
        " ribu " +
        this.terbilang(parseInt(angka) % 1000)
      );
    } else if (angka < 1000000000) {
      return (
        this.terbilang(Math.floor(parseInt(angka) / 1000000)) +
        " juta " +
        this.terbilang(parseInt(angka) % 1000000)
      );
    } else if (angka < 1000000000000) {
      return (
        this.terbilang(Math.floor(parseInt(angka) / 1000000000)) +
        " milyar " +
        this.terbilang(parseInt(angka) % 1000000000)
      );
    } else if (angka < 1000000000000000) {
      return (
        this.terbilang(Math.floor(parseInt(angka) / 1000000000000)) +
        " trilyun " +
        this.terbilang(parseInt(angka) % 1000000000000)
      );
    }
  }

  static numberToFixed(angka) {
    return Number.parseFloat(Number(angka).toFixed(2));
  }

  static checkObject({ obj, variable_name, method }) {
    // eslint-disable-line
    return new Promise((resolve, reject) => {
      // eslint-disable-line
      for (let i = 0; i < Object.keys(obj).length; i++) {
        const object = obj[Object.keys(obj)[i]]; // eslint-disable-line
      }
      resolve(obj);
    });
  }

  static isValidCode(code) {
    // Ekspresi reguler untuk memeriksa kriteria
    const regex = /^[a-z_0-9]+$/;

    // Memeriksa apakah kode valid dan tidak mengandung spasi
    return regex.test(code) && !code.includes(" ");
  }

  static async ValidasiFile({ file, ukuran_maks, jenis }) {
    return new Promise((resolve, reject) => {
      const array_tipe = Array.isArray(jenis) ? jenis : [jenis]; // Menjadikan jenis file menjadi array jika belum
      const ukuran_maksimal = ukuran_maks / 1000000; //biar jadi MB
      // Validasi ukuran file
      let callback;
      const fileType = file.mimetype.split("/")[1];
      if (file.size > ukuran_maks) {
        callback = `Ukuran file tidak boleh melebihi ${ukuran_maksimal} MB`;
      } else if (!array_tipe.includes(fileType)) {
        callback = `Jenis file harus ${array_tipe.join(" atau ")}`;
      }

      // Memastikan tidak ada error validasi
      if (!callback) {
        resolve(); // Tidak ada error, resolve promise
      } else {
        reject(new errorInFunction({ message: callback, data: null }));
      }
    });
  }
}

export default Check;

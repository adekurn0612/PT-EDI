import {
  CODE_RESPONSE,
  WORDING_RESPONSE,
} from "./../constants/constantsResponseHelper.js";

class FormatResponse {
  // 200
  static successList({ data, pages, count, limit, additionalData }) {
    // count = 0
    if (count === undefined || count === null) {
      count = "0";
    }
    count = parseInt(count);
    pages = parseInt(pages);
    limit = parseInt(limit);

    if (isNaN(pages)) pages = 0;
    if (isNaN(limit)) limit = 0;
    if (isNaN(count)) count = 0;

    return {
      data: {
        list: data,
        ...additionalData,
        meta_data: {
          count,
          pages,
          limit,
        },
      },
      meta_data: {
        status: CODE_RESPONSE.BERHASIL,
        message: WORDING_RESPONSE.BERHASIL,
      },
    };
  }

  static successResource({ data }) {
    return {
      data,
      meta_data: {
        status: CODE_RESPONSE.BERHASIL,
        message: WORDING_RESPONSE.BERHASIL,
      },
    };
  }

  static successObject({ data = null, additionalData = null }) {
    return {
      data,
      ...additionalData,
      meta_data: {
        status: CODE_RESPONSE.BERHASIL,
        message: WORDING_RESPONSE.BERHASIL,
      },
    };
  }

  static successUpdate(data, additionalData) {
    return {
      data,
      ...additionalData,
      meta_data: {
        status: CODE_RESPONSE.BERHASIL,
        message: "Berhasil mengubah data",
      },
    };
  }

  static successDelete({ data, additionalData }) {
    return {
      data,
      ...additionalData,
      meta_data: {
        status: CODE_RESPONSE.BERHASIL,
        message: "Berhasil menghapus data",
      },
    };
  }

  // 201
  static successCreate({ data, additionalData }) {
    return {
      data,
      ...additionalData,
      meta_data: {
        status: CODE_RESPONSE.TERBUAT,
        message: WORDING_RESPONSE.BERHASIL,
      },
    };
  }

  static errorServer({ error }) {
    return {
      data: null,
      meta_data: {
        status: CODE_RESPONSE.SYSTEM_ERROR,
        message: error.message || WORDING_RESPONSE.SYSTEM_ERROR,
        error,
      },
    };
  }

  // TIDAK DITEMUKAN PRIMARY KEY
  static error404({ message }) {
    return {
      data: null,
      meta_data: {
        status: CODE_RESPONSE.LIST_TIDAK_DITEMUKAN,
        message: message,
      },
    };
  }

  static error400({ message, error }) {
    return {
      data: null,
      meta_data: {
        status: CODE_RESPONSE.BAD_REQUEST,
        message,
        error,
      },
    };
  }

  static error204({ message }) {
    return {
      data: null,
      meta_data: {
        status: CODE_RESPONSE.DUPLIKAT,
        message,
      },
    };
  }

  static error203({ message, data }) {
    return {
      data,
      meta_data: {
        status: CODE_RESPONSE.GAGAL_VALIDASI,
        message,
      },
    };
  }

  // TIDAK DITEMUKAN SECONDARY ATAU OPTIONAL KEY
  static error202({ message }) {
    return {
      data: null,
      meta_data: {
        status: CODE_RESPONSE.DATA_TIDAK_DITEMUKAN,
        message,
      },
    };
  }

  static error403({ message }) {
    return {
      data: null,
      meta_data: {
        status: CODE_RESPONSE.FORBIDDEN,
        message,
      },
    };
  }
}

export default FormatResponse;

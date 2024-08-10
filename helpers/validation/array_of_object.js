class ArrayOfObjectValidation {
  static validation_value_type(tag, value, type) {
    if (typeof value !== type) return `${tag} harus bertipe ${type}`;
    else return "";
  }
  //returan
  static object_to_keys_values(obj) {
    return Object.entries(obj).map(([keyO, value]) => {
      return { key: keyO, value: value };
    });
  }
  // return messages = [{key:key_of_object,msg:string}]
  static check_type_of_keys_in_object(objItem, objFormats) {
    return ArrayOfObjectValidation.object_to_keys_values(objItem)
      .map((i) => {
        return {
          key: i.key,
          msg: ArrayOfObjectValidation.validation_value_type(
            i.key,
            i.value,
            objFormats[i.key]
          ),
        };
      })
      .filter((hf) => hf.msg !== "");
  }
  //
  static check_type_of_keys_in_objects(items, objFormats) {
    return items
      .map((i, k) => {
        return {
          key: k + 1,
          value: ArrayOfObjectValidation.check_type_of_keys_in_object(
            i,
            objFormats
          ),
        };
      })
      .filter((d) => d.value.length > 0);
  }
  // return boolean, Mengecek apakah suatu object jumlah keynya sama dengan format
  static check_length_of_keys_is_same(objItem, objFormats) {
    const arrayKeysValuesObj =
      ArrayOfObjectValidation.object_to_keys_values(objItem).length;
    const objFormatCount =
      ArrayOfObjectValidation.object_to_keys_values(objFormats).length;
    return arrayKeysValuesObj === objFormatCount;
    // const countKeyEachObject = arrayKeysValuesObj.map(rr => {
    //     console.log({rr,objFormatCount});
    //     return rr.length == objFormatCount
    // })
    // console.log("==========");
    // console.log({fdsadfas:arrayKeysValuesObj.length});
    // console.log("==========");
    // return countKeyEachObject.reduce((acc, x) => acc & x);
  }
  static check_length_of_keys_is_same_in_objects(objItems, objFormats) {
    let isSame = true;
    for (let i = 0; i < objItems.length; i++) {
      const result = ArrayOfObjectValidation.check_length_of_keys_is_same(
        objItems[i],
        objFormats
      );
      if (!result) {
        isSame = false;
        break;
      }
    }
    return isSame;
  }
}

export default { ArrayOfObjectValidation };

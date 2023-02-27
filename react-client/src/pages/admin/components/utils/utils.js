//Change Category Function
export const changeCategory = (
  e,
  categories,
  setAttributesFromDb,
  setCategoryChoosen
) => {
  const highLevelCategory = e.target.value.split("/")[0];
  const highLevelCategoryAllData = categories.find(
    (cat) => cat.name === highLevelCategory
  );
  if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
    //Set new attrs data for category change
    setAttributesFromDb(highLevelCategoryAllData.attrs);
  } else {
    setAttributesFromDb([]);
  }
  setCategoryChoosen(e.target.value);
};

export const setValuesForAttrFromDbSelectForm = (
  e,
  attributesFromDb,
  attrVal
) => {
  //console.log(e.target.value);
  if (e.target.value !== "Choose attribute") {
    //console.log(attrVal.current);
    var selectedAttr = attributesFromDb.find(
      (item) => item.key === e.target.value
    );
    let valuesForAttrKey = attrVal.current;
    console.log(selectedAttr);
    if (selectedAttr && selectedAttr.value.length > 0) {
      while (valuesForAttrKey.options.length) {
        //Remove prriously stored values
        valuesForAttrKey.remove(0);
      }
      // Add new attrs value
      valuesForAttrKey.options.add(new Option("Choose attribute value"));
      selectedAttr.value.map((item) => {
        valuesForAttrKey.add(new Option(item));
        return "";
      });
    }
  }
};

export const setAttributesTableWrapper = (key, val, setAttributesTable) => {
  setAttributesTable((attr) => {
    console.log(attr);
    if (attr.length !== 0) {
      var keyExistsInOldTable = false;
      let modifiedTable = attr.map((item) => {
        if (item.key === key) {
          //Upadte the old value with new val
          keyExistsInOldTable = true;
          item.value = val;
          return item;
        } else {
          //retrun unmodified value
          return item;
        }
      });
      if (keyExistsInOldTable) {
        return [...modifiedTable];
      } else {
        return [...modifiedTable, { key: key, value: val }];
      }
    } else {
      //return key val as local state if values are empty
      return [{ key: key, value: val }];
    }
  });
};

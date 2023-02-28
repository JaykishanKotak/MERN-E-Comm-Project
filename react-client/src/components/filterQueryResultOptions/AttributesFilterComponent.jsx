import React from "react";
import { Form } from "react-bootstrap";
const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }) => {
  //console.log(attrsFilter);
  return (
    <>
      {attrsFilter &&
        attrsFilter.length > 0 &&
        attrsFilter.map((filter, idx) => (
          <div key={idx} className="mb-3">
            <Form.Label>
              <b>{filter.key}</b>
            </Form.Label>
            {filter.value.map((valueForKey, idx2) => (
              <Form.Check
                key={idx2}
                type="checkbox"
                label={valueForKey}
                onChange={(e) => {
                  setAttrsFromFilter((filters) => {
                    //console.log(filter.key)});
                    if (filters.length === 0) {
                      //Callback for changed state
                      return [{ key: filter.key, values: [valueForKey] }];
                    }
                    //Filter key is which seleceted by click
                    let index = filters.findIndex(
                      (item) => item.key === filter.key
                    );
                    //Built in js if index not found
                    if (index === -1) {
                      // if not found (if clicked key is not inside filters)
                      //If clicked key not inside the filter(not found) and checked
                      //Return old filter with new key
                      return [
                        ...filters,
                        { key: filter.key, values: [valueForKey] },
                      ];
                    }

                    // if clicked key is inside filters and checked(for handling the uncheck)
                    if (e.target.checked) {
                      filters[index].values.push(valueForKey);
                      //Get unique values
                      let unique = [...new Set(filters[index].values)];
                      filters[index].values = unique;
                      //Retrun modified filters
                      return [...filters];
                    }

                    // if clicked key is inside filters and unchecked
                    let valuesWithoutUnChecked = filters[index].values.filter(
                      (val) => val !== valueForKey
                    );
                    filters[index].values = valuesWithoutUnChecked;
                    if (valuesWithoutUnChecked.length > 0) {
                      return [...filters];
                    } else {
                      let filtersWithoutOneKey = filters.filter(
                        (item) => item.key !== filter.key
                      );
                      return [...filtersWithoutOneKey];
                    }
                  });
                }}
              />
            ))}
          </div>
        ))}
      {/*[
        { Color: ["Red", "Blue", "Green", "Black"] },
        { Ram: ["1 TB", "2 TB", "4 TB", "5 TB"] },
      ].map((item, idx) => (
        <div key={idx} className="mb-3">
          <Form.Label>
            <b>{Object.keys(item)}</b>
          </Form.Label>
          {item[Object.keys(item)].map((i, idx) => (
            <Form.Check key={idx} type="checkbox" label={i} />
          ))}
        </div>
          ))*/}
    </>
  );
};

export default AttributesFilterComponent;

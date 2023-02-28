import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
const CategoryFilterComponent = ({ setCategoriesFromFilter }) => {
  const { categories } = useSelector((state) => state.getCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  //Write all of input type elements in array
  const myRefs = useRef([]);
  //console.log(myRefs);
  const selectCategory = (e, category, idx) => {
    setCategoriesFromFilter((items) => {
      // ret items, dynamic key and value of e.target.checked
      return { ...items, [category.name]: e.target.checked };
    });

    //Get main category name by splt first elemnt of array by ("/")
    //ex : computer/laptop/.. main category =>computer
    var selectedMainCategory = category.name.split("/")[0];
    //console.log(selectedMainCategory);

    var allCategories = myRefs.current.map((_, id) => {
      return { name: categories[id].name, idx: id };
    });
    //console.log(allCategories);
    //Reduce fun takes callback and empty array
    //To remove sub cat and select only main category without repetation
    var indexesOfMainCategory = allCategories.reduce((acc, item) => {
      //assign main category
      var cat = item.name.split("/")[0];
      if (selectedMainCategory === cat) {
        //Retrun all ids with same main category but different sub category
        //Ex : computer, computer/laptop, computer/laptop/dell, computer/laptop/lenovo etc
        acc.push(item.idx);
      }
      return acc;
    }, []);
    console.log(indexesOfMainCategory);
    if (e.target.checked) {
      setSelectedCategories((old) => [...old, "cat"]);
      myRefs.current.map((_, idx) => {
        //If arrat does not include idx
        if (!indexesOfMainCategory.includes(idx)) {
          myRefs.current[idx].disabled = true;
          //Map fun req return statement
          return "";
        }
      });
    } else {
      //For unselect and remove disable category filter
      setSelectedCategories((old) => {
        var a = [...old];
        //Remove last elemnt from array
        a.pop();
        if (a.length === 0) {
          window.location.href = "/product-list";
        }
        return a;
      });
      //For Disabled other cat while one is selected
      myRefs.current.map((_, idx2) => {
        if (allCategories.length === 1) {
          if (idx2 != idx) {
            myRefs.current[idx2].disabled = false;
          }
        } else if (selectedCategories.length === 1) {
          myRefs.current[idx2].disabled = false;
        }
        return "";
      });
    }
  };
  return (
    <>
      <span className="fw-bold">Category</span>
      <Form>
        {categories.map((category, idx) => (
          <div key={idx}>
            <Form.Check type="checkbox" id={`check-api-filter-${idx}`}>
              <Form.Check.Input
                type="checkbox"
                isValid
                //Ref passed to collect all of inputs
                ref={(el) => (myRefs.current[idx] = el)}
                onChange={(e) => selectCategory(e, category, idx)}
              />
              <Form.Check.Label style={{ cursor: "pointer" }}>
                {category.name}
              </Form.Check.Label>
              {/*<Form.Control.Feedback type="valid">
                You did it!
        </Form.Control.Feedback>*/}
            </Form.Check>
          </div>
        ))}
      </Form>
    </>
  );
};

export default CategoryFilterComponent;

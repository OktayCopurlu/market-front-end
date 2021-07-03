import React, { useContext } from "react";
import ProductContext from "../../../../context/productContext";
import "../../../../moduls/product/listProduct/main/productList.css";
import {
  Grid,
  Typography,
  AccordionSummary,
  Radio,
  RadioGroup,
  Accordion,
  FormControlLabel,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as categoryLinksCss from "./categoryLinksStyle";

export default function CategoryLinks() {
  const classes = categoryLinksCss.useStyles();
  const productContext = useContext(ProductContext);

  const onSubmit = async (event) => {
    try {
      if (event.target.value === "null") {
        return await productContext.mainCategoryHandler(null);
      } else {
        return await productContext.mainCategoryHandler(event.target.value);
      }
    } catch (error) {
      return await console.log(error);
    }
  };

  const array = ["Clothes", "Hausehold", "Electronic", "Toys", "Others"];
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Choose Category</Typography>
        </AccordionSummary>
        <Grid>
          <RadioGroup>
            <FormControlLabel
              className={classes.categoryList}
              control={<Radio value="null" onChange={onSubmit} />}
              label="Cancel selection"
            />
            {array.map((category, index) => {
              return (
                <FormControlLabel
                  className={classes.categoryList}
                  key={index}
                  control={<Radio onChange={onSubmit} value={category} />}
                  label={category}
                />
              );
            })}
          </RadioGroup>
        </Grid>
      </Accordion>
    </div>
  );
}

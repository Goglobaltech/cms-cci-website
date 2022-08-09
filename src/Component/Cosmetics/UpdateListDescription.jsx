import React, { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Box, Grid, TextField, Avatar } from "@mui/material";
import "./listdescription.scss";

export default function UpdateListDescription(props) {
  const items = props.items;

  const listItems = items?.map((item) => {
    // console.log("item.key::", item);
    return (
      <Box className="list-description">
        <Grid item container spacing={1}>
          <Grid item xs={11}>
            <Box className="btn-text-field">
              <Grid item container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={item?.benefitsList}
                    onChange={(e) =>
                      props.setUpdateBenefitsList(e.target.value, item?.key)
                    }
                    className="text-field"
                    fullWidth
                    id="input-with-sx"
                    placeholder="english description"
                    size="small"
                    rows={3}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={item?.benefitsListKH}
                    onChange={(e) =>
                      props.setUpdateBenefitsListKH(e.target.value, item?.key)
                    }
                    className="text-field"
                    fullWidth
                    id="input-with-sx"
                    placeholder="khmer description"
                    size="small"
                    rows={3}
                    multiline={true}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <DeleteRoundedIcon
              onClick={() => {
                props.deleteItem(item.key);
              }}
              className="delete-icon"
            />
          </Grid>
        </Grid>
      </Box>
    );
  });
  return listItems;
}

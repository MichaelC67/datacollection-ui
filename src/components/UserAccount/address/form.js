import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserAccountContext } from "../context";
import { AddressDisplay } from "./display";

export const AddressForm = ({ open, close, address }) => {
  const { updateAddress } = useContext(UserAccountContext);
  const [confirmation, setConfirmation] = useState(false);

  const [formValues, setFormValues] = useState({ ...address });

  const onChange = (name) => (e) => {
    setFormValues({ ...formValues, [name]: e.target.value });
  };

  const validateForm = () => {
    setConfirmation(true);
  };

  const confirm = () => {
    setConfirmation(false);
    close();
    const newAdress = { ...formValues };
    updateAddress(newAdress);
  };

  return (
    <>
      {!confirmation && (
        <Dialog open={open} onClose={close} maxWidth="xl" fullWidth>
          <DialogTitle>
            {`Modification de l'adresse`}
            <IconButton
              aria-label="close"
              onClick={close}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              className="name-form"
              margin="dense"
              label={"N°"}
              fullWidth
              variant="standard"
              value={formValues.streetNumber}
              onChange={onChange("streetNumber")}
            />
            <TextField
              className="name-form"
              margin="dense"
              label={"Rue"}
              fullWidth
              variant="standard"
              value={formValues.streetName}
              onChange={onChange("streetName")}
            />
            <TextField
              className="name-form"
              margin="dense"
              label={"Code Postal"}
              fullWidth
              variant="standard"
              value={formValues.zipCode}
              onChange={onChange("zipCode")}
            />
            <TextField
              className="name-form"
              margin="dense"
              label={"Commune"}
              fullWidth
              variant="standard"
              value={formValues.city}
              onChange={onChange("city")}
            />
            <TextField
              className="name-form"
              margin="dense"
              label={"Pays"}
              fullWidth
              variant="standard"
              value={formValues.countryName}
              onChange={onChange("countryName")}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={close}>
              Annuler
            </Button>
            <Button variant="contained" onClick={validateForm}>
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={confirmation}
        onClose={() => setConfirmation(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{`Confirmation de l'adresse`}</DialogTitle>
        <DialogContent>
          {`Confirmez-vous l'adrese suivante ?`}
          <br />
          <br />
          <AddressDisplay address={formValues} title={false} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setConfirmation(false)}>
            Non
          </Button>
          <Button variant="contained" onClick={confirm}>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

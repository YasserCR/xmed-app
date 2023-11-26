import { updateUser, getUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { formatInputDate } from "../utils/date";

const genderOptions = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Femenino" },
  { value: "O", label: "Otro" },
];

const EditUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const formatUser = (user) => {
    const updatedUser = { ...userDetails };
    Object.keys(updatedUser).forEach((key) => {
      if (user[key]) updatedUser[key] = user[key];
    });
    if (user.birthDate) {
      updatedUser.birthDate = formatInputDate(user.birthDate);
    }
    setUserDetails(updatedUser);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser();
        formatUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);

  const handleInputChange = (event, field) => {
    setUserDetails({
      ...userDetails,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Establecer loading a true cuando se envía el formulario
    try {
      await updateUser(userDetails);
      navigate("/app/redirect", { state: { toPath: "/app/users" } });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Establecer loading a false cuando se complete la solicitud
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Typography component="h2" variant="h2">
          Edición de Usuario
        </Typography>
        <Box my={2}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextField
                      label="Nombre (s)"
                      type="text"
                      name="firstName"
                      value={userDetails.firstName}
                      onChange={(e) => handleInputChange(e, "firstName")}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                      helperText="Campo obligatorio"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextField
                      label="Apellidos"
                      type="text"
                      name="lastName"
                      value={userDetails.lastName}
                      onChange={(e) => handleInputChange(e, "lastName")}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                      helperText="Campo obligatorio"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextField
                      label="Fecha de nacimiento"
                      type="date"
                      name="birthDate"
                      value={userDetails.birthDate}
                      onChange={(e) => handleInputChange(e, "birthDate")}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                      <InputLabel>Género</InputLabel>
                      <Select
                        name="gender"
                        value={userDetails.gender}
                        onChange={(e) => handleInputChange(e, "gender")}
                      >
                        {genderOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Agregar otros campos (Phone, Address, Email, Password) utilizando TextField */}
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextField
                      label="Teléfono"
                      type="number"
                      name="phone"
                      value={userDetails.phone}
                      onChange={(e) => handleInputChange(e, "phone")}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextField
                      label="Dirección"
                      type="text"
                      name="address"
                      value={userDetails.address}
                      onChange={(e) => handleInputChange(e, "address")}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextField
                      label="Correo electrónico"
                      type="text"
                      name="email"
                      value={userDetails.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextField
                      label="Contraseña"
                      type="password"
                      name="password"
                      value={userDetails.password}
                      onChange={(e) => handleInputChange(e, "password")}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={{ "& > button": { m: 1 } }}>
                      <LoadingButton
                        size="small"
                        onClick={handleSubmit} // Llama a la función handleSubmit sin pasar argumentos
                        loading={loading}
                        variant="outlined"
                        disabled={!loading ? false : true}
                      >
                        Enviar
                      </LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </header>
    </div>
  );
};

export default EditUser;

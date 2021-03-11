<template>
  <v-card flat class="ma-16">
    <v-snackbar v-model="snackbar" absolute top right :color="this.color">
      <span>{{ answer }}</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.dni"
              :rules="rules.dni"
              color="#F5914D"
              label="DNI / NIF"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.name"
              :rules="rules.name"
              color="#F5914D"
              label="Nombre"
              name="name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.surname"
              :rules="rules.name"
              color="#F5914D"
              label="Apellidos"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.phone"
              :rules="rules.phone"
              color="#F5914D"
              label="Número de teléfono"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.email"
              :rules="rules.email"
              color="#F5914D"
              label="Correo electrónico"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.confirmEmail"
              :rules="rules.email"
              color="#F5914D"
              label="Confirmar correo electrónico"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.password"
              color="#F5914D"
              label="Contraseña"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.confirmPassword"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.passwordMatch"
              color="#F5914D"
              :type="showConfirmPassword ? 'text' : 'password'"
              label="Confirmar contraseña"
              @click:append="showConfirmPassword = !showConfirmPassword"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-checkbox v-model="form.terms" color="green">
              <template v-slot:label>
                <div @click.stop="">
                  Aceptar
                  <a href="#" @click.prevent="terms = true"
                    >Términos y Condiciones</a
                  >
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text @click="resetForm">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="#F5914D" type="submit">
          Registrar
        </v-btn>
      </v-card-actions>
    </v-form>
    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title">
          Términos y Condiciones
        </v-card-title>
        <v-card-text>
          “Los datos personales aquí recogidos serán tratados por Clínica FORTIA
          con la finalidad de registrar los datos médicos y personales del
          paciente y poder llevar un estudio detallado de su evolución además de
          gestionar sus citas y ejrcicios en una hora y fecha determinada con el
          fin de ayudar a la gestión de la clínica y al paciente. La base
          legítima de dicho tratamiento es el consentimiento expreso, así como
          la obligación legal de Clínica FORTIA en materia de salud y prevención
          laboral y el interés público. Con su participación consiente
          expresamente a que sus datos puedan ser tratados por la app, pudiendo
          revocarlo en cualquier momento. Estos datos no serán cedidos salvo los
          casos previstos legalmente y se conservarán durante el tiempo
          necesario para cumplir con la finalidad para la que se recabaron y las
          obligaciones legalmente establecidas, o hasta que se revoque el
          consentimiento previamente prestado. El responsable del tratamiento es
          lel responsable de la clínica, ante quien se podrán ejercer los
          correspondientes derechos, mediante escrito dirigido a la Delegada de
          Protección de Datos (Colegio de San Ildefonso, Plaza de San Diego,
          s/n. 28801 Alcalá de Henares. Madrid) o por correo electrónico
          (info@clinicafortia.com), adjuntando copia del DNI o equivalente. En
          caso de conflicto, se podrá plantear recurso ante la Agencia Española
          de Protección de Datos. Para una información más detallada puede
          consultarse la Política de Privacidad de la clínica.” Del mismo modo
          la política de privacidad de la aplicación es la siguiente: POLÍTICA
          DE PRIVACIDAD
          <br /><br />1.- ¿Quién trata los datos?<br />
          Los datos personales serán tratados por Clínica FORTIA.
          <br />2.- ¿Qué datos son tratados?<br />
          La app tratará los datos de los pacientes y trabajadores de Clínica
          FORTIA. En concreto, se tratarán la dirección de correo electrónico,
          el DNI, nombre y apellidos, fecha de nacimiento de los pacientes,
          número de teléfono, historial clínico del paciente y las citas y
          ejercicios, así como la fecha y hora en la que se desempeñan.
          <br />3.- ¿Con qué finalidad se tratan los datos?<br />
          La finalidad de la app es la de mantener un control y gestión de las
          citas de la clínica y los historiales clínicos y ejercicios de los
          pacientes. Además la app podrá enviar recordatorios y notificaciones
          de correo sobre las citas y ejercicios pendientes.
          <br />Asimismo, a causa de la pandemia que vivimos, la finalidad
          adicional de esta aplicación, en el supuesto de que hubiera sido
          comunicado un caso positivo de COVID-19, es ayudar al coordinador
          clínica, que será la única persona que tenga acceso a la información
          necesaria, en su obligación de notificar a las autoridades sanitarias,
          u organismo competente, los datos de las personas que han estado en
          contacto con la persona contagiada. <br />Con los datos recogidos se
          elaborarán perfiles de los usuarios y se adoptarán decisiones
          individuales automatizadas, como las notificaciones y recordatorios de
          proximas citas y ejercicios. <br />En ningún momento la app llevará un
          control adicional de los usurios ni los datos recogidos por la misma
          se podrán utilizar para otra finalidad que la descrita. La app no
          instalará en el dispositivo empleado ningún mecanismo de control de
          contactos o de seguimiento de los usurios <br />4.- ¿Cuál es la base
          que legitima el tratamiento?<br />
          Dado el carácter voluntario de esta app, la misma descansa en el
          consentimiento expreso e informado del usuario que la utilice (arts.
          6.1.a) RGPD y arts. 6 y 8 LOPDGDD).
          <br />Asimismo, la comunicación a las autoridades sanitarias u
          organismos competentes, será una consecuencia de la obligación legal
          prevista, especialmente, en la LO 3/1986, de medidas especiales en
          materia de seguridad pública, en la Ley 31/1995 de Prevención de
          Riesgos laborales, y en el RDL 21/2020, de medias urgentes de
          prevención, contención y coordinación para hacer frente a la crisis
          sanitaria ocasionada por el COVID-19. <br />5.- Consentimiento<br />
          El tratamiento de datos personales del interesado para el uso de la
          aplicación, cuya finalidad ya se ha expuesto anteriormente, necesita
          de su consentimiento expreso e informado y para ello marcará la
          casilla destinada a dicho efecto. Con el fin de que el consentimiento
          sea libremente prestado, se informa que la no utilización de la app no
          conllevará ningún tipo de consecuencia negativa ni tendrá ninguna
          repercusión para el usuario de manera sanitaria.
          <br />6.- ¿Cuánto tiempo se conservan los datos?<br />
          El plazo de conservación de los datos recogidos en la app y en los
          servidores será indefinido.
          <br />7.- ¿A quién se comunican los datos?<br />
          Los datos son conocidos los usuarios y el responsable de la clínica,
          en los casos previstos legalmente de detectarse un caso declarado
          positivo, a las autoridades sanitarias competentes del Servicio de
          Salud Pública de la Comunidad de Madrid u otros organismos
          competentes.
          <br />8.- ¿Cómo se pueden ejercer los derechos?<br />
          Los podrá ejercer el titular de los datos o su representante legal o
          voluntario. Y lo hará frente al responsable de la clínica,
          dirigiéndose por escrito a la Delegada de Protección de Datos, en la
          dirección Plaza de San Diego, s/n, 28801 Alcalá de Henares (Madrid) o
          bien por mail a la dirección info@clinicafortia.com, adjuntando
          fotocopia del DNI o equivalente. En el caso de representación, deberá
          probarse mediante las formas admitidas en Derecho.
          <br />El procedimiento para el ejercicio de derechos se encuentra
          publicado en la página web de Protección de Datos
          (https://www.uah.es/protecciondedatos - PROCEDIMIENTOS). <br />En todo
          caso, si los titulares no estuvieran de acuerdo con la respuesta
          ofrecida, podrán presentar una reclamación ante la Agencia Española de
          Protección de Datos. <br />9.- ¿Se realizan transferencias
          internacionales de datos?<br />
          No se producirán transferencias internacionales.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="#F5914D" @click="terms = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "EmployeeSignUpData",

  data() {
    const defaultForm = Object.freeze({
      name: "",
      surname: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      terms: false,
      birthdate: "",
    });

    return {
      form: Object.assign({}, defaultForm),
      showPassword: false,
      showConfirmPassword: false,
      rules: {
        name: [(val) => (val || "").length > 0 || "Campo obligatorio"],
        email: [
          (value) => (value || "").length > 0 || "Campo obligatorio.",
          (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "correo electrónico erróneo.";
          },
        ],
        phone: [
          (value) => (value || "").length > 0 || "Campo obligatorio.",
          (value) => (value || "").length == 9 || "Telefono no válido",
          (value) => {
            const pattern = /^[679]{1}[0-9]{8}$/;
            return pattern.test(value) || "Teléfono móvil erróneo.";
          },
        ],
        password: [
          (value) => (value || "").length > 0 || "Campo obligatorio.",
          (value) => {
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            return (
              pattern.test(value) ||
              "La contraseña debe contener al menos un número, un carácter especial, una letra en mayúscula y tener una longitud mayor de 8 caracteres."
            );
          },
        ],
        dni: [
          (value) => (value || "").length > 0 || "Campo obligatorio.",
          (value) => {
            const pattern = /^[0-9]{8,8}[A-Za-z]$/;
            return (
              pattern.test(value) || "El DNI no tiene un formato correcto."
            );
          },
        ],
        passwordMatch: [
          (value) => {
            return (
              value === this.form.password || "Las contraseñas no coinciden."
            );
          },
        ],
        emailMatch: [
          (value) => {
            return (
              value === this.form.email ||
              "Los correos electrónicos deben de coincidir."
            );
          },
        ],
      },
      snackbar: false,
      terms: false,
      defaultForm,
      answer: "",
      color: "",
    };
  },

  computed: {
    formIsValid() {
      return (
        this.checkDNI() &&
        this.form.name &&
        this.form.surname &&
        this.checkEmail() &&
        this.checkPassword() &&
        this.checkEmail &&
        this.form.confirmEmail === this.form.email &&
        this.form.confirmPassword === this.form.password &&
        this.form.terms
      );
    },
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      this.color = "success";
      this.answer =
        "Registro completado. Se ha enviado el correo de confirmación.";
      this.snackbar = true;
      console.log(this.form);
      this.resetForm();
    },
    checkPassword() {
      let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      return pattern.test(this.form.password);
    },
    checkEmail() {
      let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(this.form.email);
    },
    checkDNI() {
      let pattern = /^[0-9]{8,8}[A-Za-z]$/;
      return pattern.test(this.form.dni);
    },
    checkPhone() {
      let pattern = /^[679]{1}[0-9]{8}$/;
      return pattern.test(this.form.phone);
    },
  },
};
</script>

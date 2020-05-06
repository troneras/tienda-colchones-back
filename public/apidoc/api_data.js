define({ "api": [
  {
    "type": "get",
    "url": "/colchones",
    "title": "Listar colchones",
    "description": "<p>Permite realizar una búsqueda filtrada y paginada de los colchones disponibles. Es necesario que el usuario esté autorizado en la api para mostrar los resultados.</p>",
    "name": "GetColchones",
    "group": "Colchon",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Optional Limitar el número de colchones devueltos</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>Optional Saltar colchones</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "colchones",
            "description": "<p>Lista con los colchones disponibles</p>"
          }
        ]
      }
    },
    "filename": "./routes/apiv1/colchones.js",
    "groupTitle": "Colchon"
  },
  {
    "type": "put",
    "url": "/colchones",
    "title": "Actualizar colchón",
    "description": "<p>Permite actualizar el colchón Es necesario que el usuario esté autorizado en la api para realizar ésta acción.</p>",
    "name": "UpdateColchon",
    "group": "Colchon",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token jwt del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "image",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "price",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "colchon-",
            "description": "<p>El colchon actualizado</p>"
          }
        ]
      }
    },
    "filename": "./routes/apiv1/colchones.js",
    "groupTitle": "Colchon"
  },
  {
    "type": "get",
    "url": "/somieres",
    "title": "Listar somieres",
    "description": "<p>Permite realizar una búsqueda filtrada y paginada de los somieres disponibles. Es necesario que el usuario esté autorizado en la api para mostrar los resultados.</p>",
    "name": "GetSomieres",
    "group": "Somier",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Optional Limitar el número de somieres devueltos</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>Optional Saltar somieres</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "somieres",
            "description": "<p>Lista con los somieres disponibles</p>"
          }
        ]
      }
    },
    "filename": "./routes/apiv1/somieres.js",
    "groupTitle": "Somier"
  },
  {
    "type": "put",
    "url": "/somieres",
    "title": "Actualizar somier",
    "description": "<p>Permite actualizar el somier Es necesario que el usuario esté autorizado en la api para realizar ésta acción.</p>",
    "name": "UpdateSomieres",
    "group": "Somier",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token jwt del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "image",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "price",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "somier",
            "description": "<p>El somier actualizado</p>"
          }
        ]
      }
    },
    "filename": "./routes/apiv1/somieres.js",
    "groupTitle": "Somier"
  },
  {
    "type": "get",
    "url": "/usuarios/me",
    "title": "Logged User",
    "description": "<p>Permite al usuario recuperar su información. Es necesario estar logueado</p>",
    "name": "GetUsuario",
    "group": "Usuario",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token jwt del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Información del usuario logueado</p>"
          }
        ]
      }
    },
    "filename": "./routes/apiv1/users.js",
    "groupTitle": "Usuario"
  },
  {
    "type": "post",
    "url": "/usuarios/login",
    "title": "Login de usuario",
    "description": "<p>Permite hacer login de un usuario y obtener el token de autentificación</p>",
    "name": "LoginUsuario",
    "group": "Usuario",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Al menos 7 caracteres</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "user",
            "description": "<p>El usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>El token de Authentication</p>"
          }
        ]
      }
    },
    "filename": "./routes/apiv1/users.js",
    "groupTitle": "Usuario"
  },
  {
    "type": "post",
    "url": "/usuarios/logout-all",
    "title": "",
    "description": "<p>Permite al usuario desconectar de todos los dispositivos en los que haya iniciado sesión</p>",
    "name": "LogoutAllUsuario",
    "group": "Usuario",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token jwt del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          }
        ]
      }
    },
    "filename": "./routes/apiv1/users.js",
    "groupTitle": "Usuario"
  },
  {
    "type": "post",
    "url": "/usuarios/logout",
    "title": "",
    "description": "<p>Permite al usuario desconectar del dispositivo actual</p>",
    "name": "LogoutUsuario",
    "group": "Usuario",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token jwt del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization:",
          "content": "{\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          }
        ]
      }
    },
    "filename": "./routes/apiv1/users.js",
    "groupTitle": "Usuario"
  },
  {
    "type": "post",
    "url": "/usuarios/password-recovery",
    "title": "Password Recovery",
    "description": "<p>Permite al usuario recuperar su password. Se enviará un email a su dirección Genera un token que guarda en el usuario de la bbdd para después comprobar si puede resetear la contraseña</p>",
    "name": "PasswordRecoveryUsuario",
    "group": "Usuario",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": ""
          }
        ]
      }
    },
    "filename": "./routes/apiv1/users.js",
    "groupTitle": "Usuario"
  },
  {
    "type": "post",
    "url": "/usuarios",
    "title": "Registrar usuario",
    "description": "<p>Permite registrar un usuario</p>",
    "name": "RegistrarUsuario",
    "group": "Usuario",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Al menos 7 caracteres</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "colchon-",
            "description": "<p>El colchon actualizado</p>"
          }
        ]
      }
    },
    "filename": "./routes/apiv1/users.js",
    "groupTitle": "Usuario"
  },
  {
    "type": "post",
    "url": "/usuarios/reset-password",
    "title": "Reset Password",
    "description": "<p>Permite al usuario resetear su password. Debe incluír la nueva contraseña además del token recibido por email</p>",
    "name": "ResetPasswordUsuario",
    "group": "Usuario",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>El nuevo password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": ""
          }
        ]
      }
    },
    "filename": "./routes/apiv1/users.js",
    "groupTitle": "Usuario"
  }
] });

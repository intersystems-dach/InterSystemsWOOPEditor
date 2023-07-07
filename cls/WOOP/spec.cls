Class WOOP.spec Extends %REST.Spec [ ProcedureBlock ]
{

Parameter HandleCorsRequest = 1;

XData OpenAPI [ MimeType = application/json ]
{
{
  "swagger":"2.0",
  "info":{
    "title":"InterSystems WOOP API",
    "description":"A REST API for the InterSystems Workshop Organizer and Optimizer Program.",
    "version":"1.0.0"
  },
  "paths":{
    "/ping":{
      "get":{
        "summary":"Respond to ping",
        "description":"This request returns a reply message in response to a /ping request.",
        "operationId":"ping",
        "responses":{
          "200":{
            "description":"status of the ping request",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"The status of the ping"
                }
              }
            }
          }
        }
      }
    },
    "/version":{
      "get":{
        "summary":"Get the version of the API",
        "description":"This request returns a reply message with the version",
        "operationId":"getVersion",
        "responses":{
          "200":{
            "description":"The version",
            "schema":{
              "type":"object",
              "properties":{
                "version":{
                  "type":"string",
                  "description":"The version"
                }
              }
            }
          }
        }
      }
    },
    "/user/check":{
      "get":{
        "summary":"Checks a user",
        "description":"Checks if a user and the password is in the database",
        "operationId":"userCheck",
        "parameters":[
          {
            "name":"username",
            "in":"query",
            "type":"string",
            "description":"The username"
          },
          {
            "name":"password",
            "in":"query",
            "type":"string",
            "description":"The password"
          }
        ],
        "responses":{
          "200":{
            "description":"Returns the user",
            "schema":{
              "type":"object",
              "properties":{
                "level":{
                  "type":"integer",
                  "description":"The level of the user"
                },
                "username":{
                  "type":"string",
                  "description":"The username"
                },
                "darkmode":{
                  "type":"boolean",
                  "description":"If the darkmode is enabled for the user"
                }
              }
            }
          },
          "404":{
            "description":"User not found"
          }
        }
      }
    },
    "/user/add":{
      "post":{
        "summary":"Add a User",
        "description":"Add a User in the database",
        "operationId":"addUser",
        "responses":{
          "200":{
            "description":"Returns if the user could be added",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the user could be added"
                }
              }
            }
          },
          "401":{
            "description":"Unauthorized"
          },
          "409":{
            "description":"User already exists"
          }
        }
      }
    },
    "/user/delete":{
      "post":{
        "summary":"Delete a User",
        "description":"Deletes a User in the database",
        "operationId":"deleteUser",
        "responses":{
          "200":{
            "description":"Returns if the user could be deleted",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the user could be deleted"
                }
              }
            }
          },
          "401":{
            "description":"Unauthorized"
          },
          "404":{
            "description":"User not found"
          }
        }
      }
    },
    "/user/change/password":{
      "post":{
        "summary":"Change a password of a user",
        "description":"Change a password of a user",
        "operationId":"changePassword",
        "responses":{
          "200":{
            "description":"Returns if the password could be changed",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the password could be changed"
                }
              }
            }
          },
          "401":{
            "description":"Unauthorized"
          },
          "404":{
            "description":"Could not find user"
          }
        }
      }
    },
    "/user/make/admin":{
      "post":{
        "summary":"Make a user to an admin",
        "description":"Make a user to an admin",
        "operationId":"makeUserToAdmin",
        "responses":{
          "200":{
            "description":"Returns if the user could be set to admin",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the user could be set to admin"
                }
              }
            }
          },
          "401":{
            "description":"Unauthorized"
          },
          "404":{
            "description":"Could not find user"
          }
        }
      }
    },
    "/chapter/get/all":{
      "get":{
        "summary":"Get all chapters",
        "description":"Get all chapters from the database",
        "operationId":"getAllChapters",
        "responses":{
          "200":{
            "description":"An array of all chapters",
            "schema":{
              "type":"object"
            }
          }
        }
      }
    },
    "/chapter/get/password":{
      "get":{
        "summary":"Get the password for a chapter",
        "description":"Get the password for a chapter",
        "operationId":"getPasswordForChapter",
        "parameters":[
          {
            "name":"title",
            "in":"query",
            "type":"string",
            "description":"The title of the chapter"
          },
          {
            "name":"username",
            "in":"query",
            "type":"string",
            "description":"The username of the user"
          },
          {
            "name":"password",
            "in":"query",
            "type":"string",
            "description":"The password of the user"
          }
        ],
        "responses":{
          "200":{
            "description":"The password of the chapter",
            "schema":{
              "type":"object",
              "properties":{
                "password":{
                  "type":"string",
                  "description":"The password"
                }
              }
            }
          },
          "401":{
            "description":"Unauthorized"
          },
          "404":{
            "description":"Chapter not found"
          }
        }
      }
    },
    "/chapter/verify":{
      "get":{
        "summary":"Verify a chapter",
        "description":"Verify a chapter with a password",
        "operationId":"verifyChapter",
        "parameters":[
          {
            "name":"title",
            "in":"query",
            "type":"string",
            "description":"The title of the chapter"
          },
          {
            "name":"password",
            "in":"query",
            "type":"string",
            "description":"The password"
          }
        ],
        "responses":{
          "200":{
            "description":"If the chapter could be verified",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the chapter could be verified"
                }
              }
            }
          },
          "404":{
            "description":"Chapter not found"
          }
        }
      }
    },
    "/chapter/new":{
      "post":{
        "summary":"Add a new Chapter",
        "description":"Adds a new chapter to the database",
        "operationId":"createNewChapter",
        "responses":{
          "200":{
            "description":"If the new chapter could be created",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the chapter could be saved"
                }
              }
            }
          },
          "409":{
            "description":"Chapter title is already in use"
          },
          "500":{
            "description":"Chapter could not be saved"
          }
        }
      }
    },
    "/chapter/update":{
      "post":{
        "summary":"Update a chapter",
        "description":"Updates a chapter in the database",
        "operationId":"updateChapter",
        "responses":{
          "200":{
            "description":"If the new chapter could be updated",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the chapter could be updated"
                }
              }
            }
          },
          "404":{
            "description":"Chapter not found"
          },
          "500":{
            "description":"Chapter could not be updated"
          }
        }
      }
    },
    "/chapter/import":{
      "post":{
        "summary":"Import a chapter",
        "description":"Imports a chapter in the database",
        "operationId":"importChapter",
        "parameters":[
          {
            "name":"username",
            "in":"query",
            "type":"string",
            "description":"The username"
          },
          {
            "name":"password",
            "in":"query",
            "type":"string",
            "description":"The password"
          }
        ],
        "responses":{
          "200":{
            "description":"If the new chapter could be imported",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the chapter could be imported"
                }
              }
            }
          },
          "401":{
            "description":"Unauthorized"
          },
          "500":{
            "description":"Chapter could not be imported"
          }
        }
      }
    },
    "/chapter/delete":{
      "post":{
        "summary":"Delete a chapter",
        "description":"Deletes a chapter in the database",
        "operationId":"deleteChapter",
        "responses":{
          "200":{
            "description":"If the new chapter could be deleted",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the chapter could be deleted"
                }
              }
            }
          },
          "404":{
            "description":"Chapter not found"
          },
          "500":{
            "description":"Chapter could not be deleted"
          }
        }
      }
    },
    "/image/upload":{
      "post":{
        "summary":"Upload an image",
        "description":"Uploads an Image to the database",
        "operationId":"uploadImage",
        "responses":{
          "200":{
            "description":"If the image could be uploaded",
            "schema":{
              "type":"object",
              "properties":{
                "status":{
                  "type":"boolean",
                  "description":"If the image could be uploaded"
                }
              }
            }
          }
        }
      }
    },
    "/image/get/{imageName}":{
      "get":{
        "summary":"Get an image",
        "description":"Get an image from the database",
        "operationId":"getImage",
        "parameters":[
          {
            "name":"imageName",
            "in":"path",
            "description":"Name of the image",
            "required":true,
            "type":"string"
          }
        ],
        "responses":{
          "200":{
            "description":"The image in base64",
            "schema":{
              "type":"string"
            }
          },
          "404":{
            "description":"Image not found"
          }
        }
      }
    },
    "/image/name/get/all":{
      "get":{
        "summary":"Get all image names",
        "description":"Get all image names in the database",
        "operationId":"getAllImageNames",
        "responses":{
          "200":{
            "description":"If the new chapter could be deleted"
          },
          "500":{
            "description":"Could not get names"
          }
        }
      }
    }
  }
}
}

}

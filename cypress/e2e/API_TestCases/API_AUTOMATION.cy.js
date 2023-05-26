/// <reference types = "cypress"/>

describe(' CYPRESS API AUTOMATION: GET - POST - PUT - DELETE', function() {
    it('OBTENER TRELLO y Verificar sus Propiedades', function() {
      cy.fixture("data").then((datos)=>{
        cy.api(datos.baseUrl_general+datos.API_KEY+"&token="+datos.TOKEN_KEY).as('TRELLO')
          cy.get("@TRELLO").then((response) => {         
            expect(response.headers).to.have.property('date');
            expect(response.headers).to.have.property("access-control-allow-methods").eq("GET, PUT, POST, DELETE");
            expect(response.status).eq(200);
          });
      });
    });
  
      it('OBTENER BOARD (Api Rest) POR SU ID', function() {
      cy.fixture("data").then((datos)=>{
          cy.api(datos.URL_BOARDS_ID+datos.IdBOARD_ApiRest+"?key="+datos.API_KEY+"&token="+datos.TOKEN_KEY).then((response)=>{
             expect(response.status).eq(200);
          });           
       });
    });

      it('OBTENER BOARD (QA_AUTOMATION) POR SU ID', function() {
        cy.fixture("data").then((datos)=>{
            cy.api(datos.URL_BOARDS_ID+datos.IdBoard_QA+"?key="+datos.API_KEY+"&token="+datos.TOKEN_KEY).then((response)=>{
              expect(response.status).eq(200);
            });           
        });
    });

    it('CREAR BOARD ', function () {
        cy.fixture("data").then((datos)=>{
          cy.api({
             method: 'POST',
              url: datos.URL_CREATE_BOARD+datos.Name_Board+"&key="+datos.API_KEY+"&token="+datos.TOKEN_KEY
              });
          }).then((response=>{
              expect(response.status).eq(200)
          })).then((response1=>{
            const ID_BOARD= response1.body.id
            const NAME_BOARD= response1.body.name
            cy.wrap(ID_BOARD).as("IDBOARD")
            cy.wrap(NAME_BOARD).as("NameBoard")
          }));
            
     });

     it('CREAR LISTA EN EL BOARD ', function() {
        cy.fixture("data").then((datos)=>{
          cy.api({
               method: 'POST',
               url: datos.URL_CREAR_LIST+datos.NAME_LIST+"&idBoard="+this.IDBOARD+"&key="+datos.API_KEY+"&token="+datos.TOKEN_KEY
              });
          }).then((response=>{
              expect(response.status).eq(200)
          })).then((response1=>{
            const ID_LIST= response1.body.id
            const NAME_LISTA= response1.body.name
            cy.wrap(ID_LIST).as("IDLIST")
            cy.wrap(NAME_LISTA).as("NameLista")

            cy.log("este es el ID DE LA LISTA: " + this.IDLIST)
            cy.log("este es el NOMBRE DE LA LISTA: " + this.NameLista)
          }));

    });

    it('CREAR CARD EN LA LISTA ', function () {
       cy.fixture("data").then((datos)=>{
          cy.api({
              method: 'POST',
               url: datos.URL_CREAR_CARD+this.IDLIST+"&name="+datos.Name_CARD+"&key="+datos.API_KEY+"&token="+datos.TOKEN_KEY
                  });
              }).then((response=>{
                  expect(response.status).eq(200)

              })).then((response1=>{
                const ID_CARD= response1.body.id
                const NOMBRE_CARD= response1.body.name
                cy.wrap(ID_CARD).as("IDCARD")
                cy.wrap(NOMBRE_CARD).as("NameCard")

                cy.log("este es el ID DE LA CARD: " + this.IDCARD)
                cy.log("este es el NOMBRE DE LA CARD: " + this.NameCard)
              }));
         });

         it('ACTUALIZAR NOMBRE DEL BOARD CREADO RECIENTEMENTE ', function() {
            cy.fixture("data").then((datos)=>{
              cy.api({
                   method: 'PUT',
                   url: datos.URL_UPDATE_BOARD+this.IDBOARD+"?key="+datos.API_KEY+"&token="+datos.TOKEN_KEY+"&name="+datos.NuevoNombre_BOARD
                  });
              }).then((response=>{
                  expect(response.status).eq(200)
              }));
              });
      
              it('ACTUALIZAR LISTA CREADA RECIENTEMENTE ', function(){
                  cy.fixture("data").then((datos)=>{
                    cy.api({
                         method: 'PUT',
                         url: datos.URL_UPDATE_LIST+this.IDLIST+"?key="+datos.API_KEY+"&token="+datos.TOKEN_KEY+"&name="+datos.NuevoNombre_LIST
                        });
                    }).then((response=>{
                        expect(response.status).eq(200)
                    }));
                    });
      
              it('ACTUALIZAR CARD CREADA RECIENTEMENTE ', function() {
                cy.fixture("data").then((datos)=>{
                   cy.api({
                       method: 'PUT',
                       url: datos.URL_UPDATE_CARD+this.IDCARD+"?key="+datos.API_KEY+"&token="+datos.TOKEN_KEY+"&name="+datos.NuevoNombre_CARD
                       });
                      }).then((response=>{
                          expect(response.status).eq(200)
                      }));
               });
               
               it('ELIMINAR CARD ', function() {
                cy.fixture("data").then((datos)=>{
                  cy.api({
                       method: 'DELETE',
                       url: datos.URL_DELETE_CARD+this.IDCARD+"?key="+datos.API_KEY+"&token="+datos.TOKEN_KEY
                      });
                  }).then((response=>{
                      expect(response.status).eq(200)
                  }));
              });
                
               it('ELIMINAR BOARD ', function() {
                   cy.fixture("data").then((datos)=>{
                       cy.api({
                         method: 'DELETE',
                         url: datos.URL_DELETE_BOARD+this.IDBOARD+"?key="+datos.API_KEY+"&token="+datos.TOKEN_KEY
                          });
                       }).then((response=>{
                           expect(response.status).eq(200)
                   }));
               });
});

require('dotenv').config();

const axios = require('axios');
const {Type} = require('../db');


const getPoketypes = async (req, res, next)=> {

    const url = ('https://pokeapi.co/api/v2/type');
    try{
        const response = await axios(url);
        const types = await response.data.results.map((el) => {
        return {
            name: el.name
        }
        });

        types.forEach(async (type) => {
            Type.findOrCreate({
                where: {
                    name: type.name
                },
            });
          });
        const dbTypes = await Type.findAll();
        res.status(200).json(dbTypes)

    }
    catch(error){
        next(error)
    }
}
        
        
    //       const typesDB= await Type.findAll();
    //       res.status(200).json(typesDB);
    //     } catch (error) {
    //       next(error);
    //     }
    //   };

    //     const pokeTypes = await Type.findAll()
    //     res.status(200).json(pokeTypes)
       
    // }
    // pokeTypes.forEach((type) => {
    //        Type.findOrCreate({
    //           where: {
    //             name: type.name,
    //           },
    //         });
    //       });
    //       const allType = await Type.findAll();
    //       res.status(200).json(allType);
    //     }
//     catch (error){
//         next(error);
//     }
// }

module.exports = getPoketypes;
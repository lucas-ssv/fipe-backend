const axios = require('axios');

class AnnouncementController {
    async index(req, res) {
        const { 
            modelo,
            ano,
            condicao,
            transmissao,
            ar_condicionado
        } = req.query;

        const response = await axios.get(
            `https://api.mercadolibre.com/sites/MLB/search?category=60297&q=${modelo}%20${ano}`
        );

        let announcements = [];

        const { results } = response.data;

        results.forEach(result => {        
            let vehicle = {
                title: result.title,
                price: result.price,
                permalink: result.permalink,
                thumbnail: result.thumbnail,
                address: {
                    city_id: result.address.city_id,
                    state_name: result.address.state_name,
                    city_name: result.address.city_name
                }
            };

            result.attributes.forEach(attr => {
                if (attr.id.includes('TRANSMISSION')) {
                    vehicle.transmission = attr.value_name;
                } else if (attr.id.includes('KILOMETERS')) {
                    vehicle.kilometers = attr.value_name;
                } else if (attr.id.includes('VEHICLE_YEAR')) {
                    vehicle.year = attr.value_name;
                } else if (attr.id.includes('FUEL_TYPE')) {
                    vehicle.fuel_type = attr.value_name;
                } else if (attr.id.includes('HAS_AIR_CONDITIONING')) {
                    vehicle.air_conditioning = attr.value_name;
                } else if (attr.id.includes('ITEM_CONDITION')) {
                    vehicle.item_condition = attr.value_name;
                }

                // console.log(vehicle.item_condition)

                // attr.values.filter(a => {
                //     if (a.name === condicao) {
                //         return announcements.push(vehicle);
                //     }
                // });

                // announcements.push(vehicle);
            });

            if (condicao && !transmissao) {
                console.log('entrou 1');
                if (result.address.city_id.includes('TUxCQ1N')) {
                    if (vehicle.fuel_type === condicao) {
                        announcements.push(vehicle);
                    }
                }
            } else if (condicao && transmissao) {
                console.log('entrou 2');
                if (result.address.city_id.includes('TUxCQ1N')) {
                    if (vehicle.fuel_type === condicao && vehicle.transmission === transmissao) {
                        announcements.push(vehicle);
                    }
                }
            } else if (!condicao && transmissao) {
                console.log('entrou 3');
                if (result.address.city_id.includes('TUxCQ1N')) {
                    if (vehicle.transmission === transmissao) {
                        announcements.push(vehicle);
                    }
                }
            } else if (!condicao && transmissao && ar_condicionado) {
                console.log('entrou 5');
                if (result.address.city_id.includes('TUxCQ1N')) {
                    if (vehicle.transmission === transmissao && vehicle.air_conditioning === ar_condicionado) {
                        announcements.push(vehicle);
                    }
                }
            } else if (condicao && transmissao && ar_condicionado) {
                console.log('entrou 6');
                if (result.address.city_id.includes('TUxCQ1N')) {
                    if (vehicle.fuel_type === condicao && vehicle.transmission === transmissao && vehicle.air_conditioning === ar_condicionado) {
                        announcements.push(vehicle);
                    }
                }
            } else if (!condicao && !transmissao && ar_condicionado) {
                console.log('entrou 7');
                if (result.address.city_id.includes('TUxCQ1N')) {
                    if (vehicle.air_conditioning === ar_condicionado) {
                        announcements.push(vehicle);
                    }
                }
            } else {
                console.log('entrou 8');
                if (result.address.city_id.includes('TUxCQ1N')) {
                    announcements.push(vehicle);
                }
            }

            // if (vehicle.item_condition === condicao) {
            //     announcements.push(vehicle);
            // }

            // if (result.address.city_id.includes('TUxCQ1N')) {
            //     announcements.push(vehicle);
            // }
        });

        console.log(announcements.length);

        announcements.sort((a, b) => {
            if (a.price > b.price) {
                return 1;
            }
            if (a.price < b.price) {
                return -1;
            }

            return 0;
        });
        
        return res.json(announcements);
    }
}

module.exports = AnnouncementController;
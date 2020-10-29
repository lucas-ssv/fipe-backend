const axios = require('axios');
const Yup = require('yup');

class AnnouncementController {
    async index(req, res) {
        const schema = Yup.object().shape({
            modelo: Yup.string().required(),
            ano: Yup.string().required()
        });

        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: 'Validation fails!' });
        }

        const { 
            modelo,
            ano,
            condicao,
            transmissao,
            ar_condicionado,
            preco_minimo,
            preco_maximo
        } = req.query;

        const response = await axios.get(
            `${process.env.ML_URL}?category=${process.env.CATEGORY}&q=${modelo}%20${ano}`
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
            });

            if (result.address.city_id.includes('TUx')) {
                if (condicao && !transmissao && !ar_condicionado && !transmissao && !preco_minimo && !preco_maximo) {
                    if (vehicle.fuel_type === condicao) {
                        announcements.push(vehicle);
                    }
                } else if (condicao && !transmissao && ar_condicionado && !preco_minimo && !preco_maximo) {
                    if (vehicle.fuel_type === condicao && vehicle.air_conditioning === ar_condicionado) {
                        announcements.push(vehicle);
                    }
                } else if (condicao && transmissao && !ar_condicionado && !preco_minimo && !preco_maximo) {
                    if (vehicle.fuel_type === condicao && vehicle.transmission === transmissao) {
                        announcements.push(vehicle);
                    }
                } else if (!condicao && transmissao && !preco_minimo && !preco_maximo) {
                    if (vehicle.transmission === transmissao) {
                        announcements.push(vehicle);
                    }
                } else if (!condicao && transmissao && ar_condicionado && !preco_minimo && !preco_maximo) {
                    if (vehicle.transmission === transmissao && vehicle.air_conditioning === ar_condicionado) {
                        announcements.push(vehicle);
                    }
                } else if (condicao && transmissao && ar_condicionado && !preco_minimo && !preco_maximo) {
                    if (vehicle.fuel_type === condicao && vehicle.transmission === transmissao &&
                            vehicle.air_conditioning === ar_condicionado) {
                        announcements.push(vehicle);
                    }
                } else if (!condicao && !transmissao && ar_condicionado && !preco_minimo && !preco_maximo) {
                    if (vehicle.air_conditioning === ar_condicionado) {
                        announcements.push(vehicle);
                    }
                } else if (preco_minimo && preco_maximo && !transmissao && !ar_condicionado && !condicao) {
                    if (vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (condicao && !transmissao && !ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.fuel_type === condicao && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (condicao && transmissao && !ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.fuel_type === condicao && vehicle.transmission === transmissao && 
                            vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (condicao && transmissao && ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.fuel_type === condicao && vehicle.transmission === transmissao && vehicle.air_conditioning === ar_condicionado && 
                            vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!condicao && transmissao && ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.transmission === transmissao && vehicle.air_conditioning === ar_condicionado && 
                            vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (condicao && !transmissao && ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.fuel_type === condicao && vehicle.air_conditioning === ar_condicionado && 
                            vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (condicao && transmissao && !ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.fuel_type === condicao && vehicle.transmission === transmissao && 
                            vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!condicao && !transmissao && ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (condicao && !transmissao && !ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.fuel_type === condicao && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!condicao && transmissao && !ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.transmission === transmissao && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!condicao && !transmissao && ar_condicionado && preco_minimo && preco_maximo) {
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else {
                    announcements.push(vehicle);
                }

                if (modelo === 'Corolla') {
                    vehicle.rating = {
                        note: 3.9,
                        link: 'https://www.icarros.com.br/toyota/corolla/opiniao-do-dono'
                    }
                } else if (modelo === 'Etios') {
                    vehicle.rating = {
                        note: 3.8,
                        link: 'https://www.icarros.com.br/toyota/etios/opiniao-do-dono'
                    }
                } else if (modelo === 'Hilux') {
                    vehicle.rating = {
                        note: 3.1,
                        link: 'https://www.icarros.com.br/toyota/hilux/opiniao-do-dono'
                    }
                } else if (modelo === 'Prius') {
                    vehicle.rating = {
                        note: 3.7,
                        link: 'https://www.icarros.com.br/toyota/prius/opiniao-do-dono'
                    }
                } else if (modelo === 'SW4') {
                    vehicle.rating = {
                        note: 2.3,
                        link: 'https://www.icarros.com.br/toyota/sw4/opiniao-do-dono'
                    }
                } else {
                    vehicle.rating = {
                        note: 0.0,
                        link: null
                    }
                }
            }
        });

        console.log(announcements.length);
        
        return res.json(announcements);
    }
}

module.exports = AnnouncementController;
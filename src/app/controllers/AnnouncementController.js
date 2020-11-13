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
            ar_condicionado,
            unico_dono,
            portas,
            condicao,
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
                if (attr.id.includes('KILOMETERS')) {
                    vehicle.kilometers = attr.value_name;
                } else if (attr.id.includes('VEHICLE_YEAR')) {
                    vehicle.year = attr.value_name;
                } else if (attr.id.includes('HAS_AIR_CONDITIONING')) {
                    vehicle.air_conditioning = attr.value_name;
                } else if (attr.id.includes('SINGLE_OWNER')) {
                    vehicle.single_owner = attr.value_name;
                } else if (attr.id.includes('DOORS')) {
                    vehicle.doors = attr.value_name;
                } else if (attr.id.includes('ITEM_CONDITION')) {
                    vehicle.item_condition = attr.value_name;
                }
            });

            if (result.address.state_name === 'São Paulo') {
                if (ar_condicionado && !unico_dono && !portas && !condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 0');
                    if (vehicle.air_conditioning === ar_condicionado) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && unico_dono && !portas && !condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 1');
                    if (vehicle.single_owner === unico_dono) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && !unico_dono && portas && !condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 2');
                    if (vehicle.doors === portas) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && !unico_dono && !portas && condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 3');
                    if (vehicle.item_condition === condicao) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && !unico_dono && !portas && !condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 4');
                    if (vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && unico_dono && !portas && !condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 5');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.single_owner === unico_dono) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && !unico_dono && portas && !condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 6');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.doors === portas) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && !unico_dono && !portas && condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 7');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.item_condition === condicao) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && !unico_dono && !portas && !condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 8');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && unico_dono && portas && !condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 9');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.single_owner === unico_dono && vehicle.doors === portas) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && !unico_dono && portas && condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 10');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.doors === portas && vehicle.item_condition === condicao) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && unico_dono && !portas && condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 11');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.single_owner === unico_dono && vehicle.item_condition === condicao) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && unico_dono && portas && condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 12');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.single_owner === unico_dono && vehicle.doors === portas && vehicle.item_condition === condicao) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && unico_dono && portas && condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 13');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.single_owner === unico_dono && vehicle.doors === portas && vehicle.item_condition === condicao
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                            announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && unico_dono && portas && !condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 14');
                    if (vehicle.single_owner === unico_dono && vehicle.doors === portas) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && unico_dono && !portas && condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 15');
                    if (vehicle.single_owner === unico_dono && vehicle.item_condition === condicao) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && unico_dono && portas && condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 16');
                    if (vehicle.single_owner === unico_dono && vehicle.doors === portas && vehicle.item_condition === condicao) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && unico_dono && portas && condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 17');
                    if (vehicle.single_owner === unico_dono && vehicle.doors === portas && vehicle.item_condition === condicao
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && !unico_dono && portas && condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 18');
                    if (vehicle.doors === portas && vehicle.item_condition === condicao
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && !unico_dono && !portas && condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 19');
                    if (vehicle.item_condition === condicao
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && !unico_dono && portas && !condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 20');
                    if (vehicle.doors === portas && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && !unico_dono && portas && !condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 21');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.doors === portas && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && unico_dono && portas && !condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 22');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.single_owner === unico_dono && vehicle.doors === portas 
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && !unico_dono && portas && condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 23');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.doors === portas && vehicle.item_condition === condicao 
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && unico_dono && portas && !condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 24');
                    if (vehicle.single_owner === unico_dono && vehicle.doors === portas 
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && unico_dono && !portas && condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 25');
                    if (vehicle.single_owner === unico_dono && vehicle.item_condition === condicao 
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && unico_dono && !portas && condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 26');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.single_owner === unico_dono && vehicle.item_condition === condicao 
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && !unico_dono && portas && condicao && !preco_minimo && !preco_maximo) {
                    console.log('ponto 27');
                    if (vehicle.doors === portas && vehicle.item_condition === condicao) {
                        announcements.push(vehicle);
                    }
                } else if (!ar_condicionado && unico_dono && !portas && !condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 28');
                    if (vehicle.single_owner === unico_dono && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else if (ar_condicionado && !unico_dono && !portas && condicao && preco_minimo && preco_maximo) {
                    console.log('ponto 29');
                    if (vehicle.air_conditioning === ar_condicionado && vehicle.item_condition === condicao 
                        && vehicle.price >= preco_minimo && vehicle.price <= preco_maximo) {
                        announcements.push(vehicle);
                    }
                } else {
                    console.log('ponto 38');
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
                } else if (modelo === 'Rav4') {
                    vehicle.rating = {
                        note: 3.3,
                        link: 'https://www.icarros.com.br/toyota/rav4/opiniao-do-dono'
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
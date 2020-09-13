const axios = require('axios');

class AnnouncementController {
    async index(req, res) {
        const { description } = req.query;

        const response = await axios.get(
            `https://api.mercadolibre.com/sites/MLB/search?category=60297&q=${description}&limit=5`
        );

        let array = [];

        const announcements = response.data.results;

        announcements.forEach(async announcement => {
            console.log(announcement.thumbnail);
            
            let vehicle = {
                title: announcement.title,
                price: announcement.price,
                permalink: announcement.permalink,
                thumbnail: announcement.thumbnail,
                address: {
                    state_name: announcement.address.state_name,
                    city_name: announcement.address.city_name
                }
            };

            announcement.attributes.forEach(attr => {
                console.log(attr.id);
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

            await array.push(vehicle);
        });

        // console.log(array);

        return res.json(array);
    }
}

module.exports = AnnouncementController;
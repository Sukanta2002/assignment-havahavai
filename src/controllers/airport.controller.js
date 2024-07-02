import client from "../db/db.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/apiResponce.js";

const getAirportDetails = asyncHandler(async (req, res) => {
  const iata_code = req.params.iata_code;
  if (!iata_code) {
    throw new ApiError(400, "IATA code is required");
  }
  const query = `
  SELECT
    airport.id AS airport_id,
    airport.icao_code,
    airport.iata_code,
    airport.name,
    airport.type,
    airport.latitude_deg,
    airport.longitude_deg,
    airport.elevation_ft,
    json_build_object(
        'city', json_build_object(
            'id', city.id,
            'name', city.name,
            'country_id', city.country_id,
            'is_active', city.is_active,
            'lat', city.lat,
            'long', city.long
        ),
        'country', json_build_object(
            'id', country.id,
            'name', country.name,
            'country_code_two', country.country_code_two,
            'country_code_three', country.country_code_three,
            'mobile_code', country.mobile_code,
            'continent_id', country.continent_id
        )
    ) AS address
FROM
    airport
JOIN
    city ON airport.city_id = city.id
JOIN
    country ON city.country_id = country.id
WHERE
    airport.iata_code = $1;

  `;

  const { rows } = await client.query(query, [iata_code]);
  // console.log(rows[0]);
  if (rows.length === 0) {
    throw new ApiError(404, "Airport not found");
  }

  const airportData = {
    airport: {
      id: rows[0].airport_id,
      icao_code: rows[0].icao_code,
      iata_code: rows[0].iata_code,
      name: rows[0].name,
      type: rows[0].type,
      latitude_deg: rows[0].latitude_deg,
      longitude_deg: rows[0].longitude_deg,
      elevation_ft: rows[0].elevation_ft,
      address: {
        city: rows[0].address.city,
        // {
        //   id: rows[0].city_id,
        //   name: rows[0].city_name,
        //   country_id: rows[0].country_id,
        //   is_active: rows[0].city_is_active,
        //   lat: rows[0].city_latitude,
        //   long: rows[0].city_longitude,
        // },
        country: rows[0].address.country,
        //  {
        //   id: rows[0].country_id,
        //   name: rows[0].country_name,
        //   country_code_two: rows[0].country_code_two,
        //   country_code_three: rows[0].country_code_three,
        //   mobile_code: rows[0].mobile_code,
        //   continent_id: rows[0].continent_id,
        // },
      },
    },
  };
  return res.status(200).json(new ApiResponce(200, airportData, "Success"));
  // return new ApiResponce(200, airportData, "Success");
});

export { getAirportDetails };

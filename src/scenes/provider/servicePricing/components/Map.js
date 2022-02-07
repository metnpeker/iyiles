
export const getDistance = (instance, origin, dest, data, serviceType, sameCity) => {
  return new Promise(async (resolve, reject) => {
        let providersList = data;
        for (let i = 0; i < providersList.length; i++) {
          let provider = providersList[i];
          let service = provider.provider_service.filter(provider_service => provider_service.service_id === serviceType)[0];
          console.log(service);
          await findClosest(instance, origin, provider).then(
            async closestLocationDistance => {
            console.log('sameCity', sameCity);
            console.log('distance', closestLocationDistance[0]);
            console.log('ps_in_actual_distance_price', service.ps_in_starting_distance_price);
              let price1 =
                closestLocationDistance[0] *
                Number(
                  sameCity ?
                  service.ps_in_starting_distance_price :
                  service.ps_out_starting_distance_price
                );
              await instance.getDistanceMatrix({
                origins: [origin],
                destinations: [dest],
                travelMode: 'DRIVING'
              },res => {
                  let distance = Number(res.rows[0].elements[0].distance.value) / 1000;
                  console.log('distance', distance);
                  console.log('serviceType', serviceType);
                  console.log('ps_in_actual_distance_price', service.ps_in_actual_distance_price);
                  let price2 =
                    distance *
                    Number(
                      sameCity ?
                      service.ps_in_actual_distance_price :
                      service.ps_out_actual_distance_price
                    );
                    console.log('price1', price1);
                    console.log('price2', price2);
                    console.log('ps_in_fixed_price', service.ps_in_fixed_price);
                  let totalPrice =
                    price1 +
                    price2 +
                    Number(
                      sameCity ?
                      service.ps_in_fixed_price :
                      service.ps_out_fixed_price
                    );
                    console.log(totalPrice);
                    resolve(totalPrice);
                });
            },
          );
        }
      }
    )
};

const findClosest = (instance, originAddress, testData) => {
  let minDistance = 5000000000;
  let mini = 0;
  return new Promise(async (resolve, reject) => {
      let station = [];
    for (let i = 0; i < testData.station.length; i++) {
      station.push(testData.station[i].sta_address);
    }
    await instance.getDistanceMatrix({
      origins: [originAddress],
      destinations: station,
      travelMode: 'DRIVING'
    },res =>  {
        for (let i = 0; i < station.length; i++) {
          if (res.rows[0].elements[0].distance.value < minDistance) {
            minDistance = res.rows[0].elements[0].distance.value;
            mini = i;
          }
          if (i === station.length - 1) {
            resolve([Number(minDistance / 1000), mini]);
          }
        }
      }
    )
  });
};

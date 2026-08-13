export function calcularDistancia(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const R = 6371000;

  const rad = (valor) => {
    return (valor * Math.PI) / 180;
  };

  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function distanciaTotal(locations) {
  let total = 0;

  for (let i = 1; i < locations.length; i++) {
    total += calcularDistancia(
      locations[i - 1].latitude,
      locations[i - 1].longitude,
      locations[i].latitude,
      locations[i].longitude
    );
  }

  return total;
}
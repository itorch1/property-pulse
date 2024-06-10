const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties({ showFeatured = false } = {}) {
  if (!apiDomain) return [];

  const res = await fetch(
    `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
    { cache: "no-store" }
  );
  try {
    if (!res.ok) throw new Error("Failed to fetch data");

    const properties = await res.json();
    return properties;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchProperty(id) {
  if (!apiDomain) return null;

  try {
    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) throw new Error("Failed to fetch data");

    const property = await res.json();
    return property;
  } catch (error) {
    console.log(error);
    return null;
  }
}

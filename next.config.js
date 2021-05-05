module.exports = {
  images: {
    domains: ["images.ctfassets.net", "lh3.googleusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/profile/favourites",
        permanent: true,
      },
    ];
  },
};

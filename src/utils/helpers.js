import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

export const ratingToPercentage = (rating) => {
  return (rating * 10).toFixed(0);
};

export const ratingColor = (rating) => {
  if (rating >= 7) {
    return "green.400";
  } else if (rating >= 5) {
    return "orange.400";
  } else {
    return "red.400";
  }
};

export const formatBirthday = (birthday, deathday) => {
  const birthdayDate = new Date(birthday);
  const deathdayDate = new Date(deathday);
  if (isNaN(birthdayDate.getTime()) || isNaN(deathdayDate.getTime()))
    return null;

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedBirthdate = birthdayDate.toLocaleDateString("en-US", options);
  const formattedDeathday = deathdayDate.toLocaleDateString("en-US", options);

  const today = new Date();
  let age = today.getFullYear() - birthdayDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthdayDate.getMonth() ||
    (today.getMonth() === birthdayDate.getMonth() &&
      today.getDate() >= birthdayDate.getDate());
  if (!hasBirthdayPassed) age--;

  let deathdayAge = deathdayDate.getFullYear() - birthdayDate.getFullYear();
  const lastYearBirthday =
    deathdayDate.getMonth() > birthdayDate.getMonth() ||
    (deathdayDate.getMonth() === birthdayDate.getMonth() &&
      deathdayDate.getDate() >= birthdayDate.getDate());
  if (!lastYearBirthday) deathdayAge--;

  return deathday
    ? `${formattedBirthdate} - ${formattedDeathday} (age ${deathdayAge})`
    : `${formattedBirthdate} (age ${age})`;
};

export const getMostPopularWorks = (works) => {
  const sortedWorks = works.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });

  return sortedWorks.slice(0, 10);
};

export const getSocialLinks = (socials) => {
  const socialLinks = [
    {
      id: socials.facebook_id,
      url: `https://www.facebook.com/${socials.facebook_id}`,
      icon: FaFacebook,
      label: "Facebook",
    },
    {
      id: socials.instagram_id,
      url: `https://www.instagram.com/${socials.instagram_id}`,
      icon: FaInstagram,
      label: "Instagram",
    },
    {
      id: socials.twitter_id,
      url: `https://twitter.com/${socials.twitter_id}`,
      icon: FaTwitter,
      label: "Twitter",
    },
    {
      id: socials.tiktok_id,
      url: `https://www.tiktok.com/@${socials.tiktok_id}`,
      icon: FaTiktok,
      label: "TikTok",
    },
    {
      id: socials.youtube_id,
      url: `https://www.youtube.com/${socials.youtube_id}`,
      icon: FaYoutube,
      label: "YouTube",
    },
  ];

  return socialLinks.filter((item) => item.id);
};

export const getFlagEmoji = (countryCode) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
};

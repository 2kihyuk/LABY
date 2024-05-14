//CreatorList.js
export const creators = [
  {
    name: "Sang_S",
    height: 160,
    weight: 50,
    image: "https://images.onthelook.co.kr/user-profile/2023081714081588438920.jpeg?w=192&q=60&f=webp",
    post: "https://images.onthelook.co.kr/posts/20231205121222367015170.jpeg?w=1200&q=75&f=webp",
    title: "나이키 에어포스와 캠퍼스룩",
    tag: {
      brand: "Nike",
      productName: "Air Jordan",
      size: "230",
      price: "96,000",
      purchaseLocation: "https://www.nike.com/"
    },
    styleTag: {
      gender: 'WOMEN',
      season: '여름',
      mood: '러블리'
    }
  },
  {
    name: "San_g",
    height: 160,
    weight: 50,
    image: "https://images.onthelook.co.kr/user-profile/20240303090353932840360.jpeg?w=192&q=60&f=webp",
    post: "https://images.onthelook.co.kr/posts/2024040501041638615920.jpeg?w=600&q=60&f=webp",
    title: "나이키 에어포스와 캠퍼스룩",
    tag: {
      brand: "Nike",
      productName: "Air Jordan",
      size: "230",
      price: "96,000",
      purchaseLocation: "https://www.nike.com/"
    },
    styleTag: {
      gender: 'WOMEN',
      season: '여름',
      mood: '러블리'
    }
  },
  {
    name: "S_ang",
    height: 160,
    weight: 50,
    image: "https://images.onthelook.co.kr/u/mdxJLm6zuKKGkRmSUEWHyj.jpeg?w=192&q=60&f=webp",
    post: "https://images.onthelook.co.kr/posts/2024040501047988615920.jpeg?w=600&q=60&f=webp",
    title: "나이키 에어포스와 캠퍼스룩",
    tag: {
      brand: "Nike",
      productName: "Air Jordan",
      size: "230",
      price: "96,000",
      purchaseLocation: "https://www.nike.com/"
    },
    styleTag: {
      gender: 'WOMEN',
      season: '여름',
      mood: '러블리'
    }
  },
  {
    name: "Sa_ng",
    height: 160,
    weight: 50,
    image: "https://images.onthelook.co.kr/p/fS56xVnVvVQNnud7NzapAL.jpeg?w=1200&q=75&f=webp",
    post: "https://images.onthelook.co.kr/posts/202404031204529511540700.jpeg?w=1200&q=75&f=webp",
    title: "나이키 에어포스와 캠퍼스룩",
    tag: {
      brand: "Nike",
      productName: "Air Jordan",
      size: "230",
      price: "96,000",
      purchaseLocation: "https://www.nike.com/"
    },
    styleTag: {
      gender: 'WOMEN',
      season: '여름',
      mood: '러블리'
    }
  },
  {
    name: "Saan_g",
    height: 160,
    weight: 50,
    image: "https://images.onthelook.co.kr/posts/202401010301199813441550.jpeg?w=1200&q=75&f=webp",
    post: "https://images.onthelook.co.kr/posts/2024040501041687615920.jpeg?w=1200&q=75&f=webp",
    title: "나이키 에어포스와 캠퍼스룩",
    tag: {
      brand: "Nike",
      productName: "Air Jordan",
      size: "230",
      price: "96,000",
      purchaseLocation: "https://www.nike.com/"
    },
    styleTag: {
      gender: 'WOMEN',
      season: '여름',
      mood: '러블리'
    }
  },
  {
    name: "Sang_Sa",
    height: 160,
    weight: 50,
    image: "https://images.onthelook.co.kr/posts/20240316130383643787380.jpeg?w=1200&q=75&f=webp",
    post: "https://images.onthelook.co.kr/posts/2024040501042052615920.jpeg?w=600&q=60&f=webp",
    title: "나이키 에어포스와 캠퍼스룩",
    tag: {
      brand: "Nike",
      productName: "Air Jordan",
      size: "230",
      price: "96,000",
      purchaseLocation: "https://www.nike.com/"
    },
    styleTag: {
      gender: 'women',
      season: '여름',
      mood: '러블리'
    }
  }
];

// export const addImage = (creatorName, creatorImage, imageUrl, tags, styleTag, text , height, weight) => {
//   creators.push({
//     name: creatorName,
//     image: creatorImage,
//     post: imageUrl,
//     tag: tags,
//     styleTag: styleTag,
//     title: text,
//     height: height,
//     weight:weight
//   });
// };
export const addImage = (creatorName, creatorImage, imageUrl, tags, gender, season, mood, category, text , height , weight) => {
  creators.push({
    name: creatorName,
    image: creatorImage,
    post: imageUrl,
    tag: tags,
    gender: gender,
    season: season,
    mood: mood,
    category: category,
    title: text,
    height: height,
    weight:weight
  });
};

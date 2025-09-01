export const categories = [
  {
    name: 'Voiture',
    image: 'https://i.pinimg.com/564x/db/d1/b4/dbd1b4767644fe85a6e2162a1fa441dc.jpg',
  },
  {
    name: 'Sport',
    image: 'https://i.pinimg.com/564x/4b/ed/b2/4bedb2e905e9027b0889f99dfaaf6c95.jpg',
  },
  {
    name: 'Fond D\'écran',
    image: 'https://i.pinimg.com/564x/e2/39/9b/e2399b402c67c4f8dbd80211817f22ec.jpg',
  },
  {
    name: 'Site Web',
    image: 'https://i.pinimg.com/236x/86/52/0f/86520f838c60cf7f3f1b119f53e803e7.jpg',
  },
  {
    name: 'Nourriture',
    image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
  },
  {
    name: 'Nature',
    image: 'https://i.pinimg.com/564x/9a/8c/d4/9a8cd4a8cf26cf3b1f422d39e0697a05.jpg',
  },
  {
    name: 'Art',
    image: 'https://i.pinimg.com/564x/8e/30/4a/8e304aac188acd1f61943e58752a2115.jpg',
  }, {
    name: 'Voyage',
    image: 'https://i.pinimg.com/236x/4c/d0/09/4cd0096dacf111cd4fd64e68fd5bd022.jpg',
  },
  {
    name: 'Citations ',
    image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
  }, {
    name: 'Animaux',
    image: 'https://i.pinimg.com/564x/f4/09/6e/f4096ead2ce011134f90d148c884c83a.jpg',
  },
  {
    name: 'Autres',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {

  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
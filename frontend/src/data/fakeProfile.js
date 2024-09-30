import { v4 as uuidv4 } from 'uuid';

const fakeProfiles = [
  {
    id: uuidv4(),
    username: 'johndoe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Adventurer and coffee enthusiast',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    coverPhoto: 'https://picsum.photos/id/1018/1000/300',
    friends: [],
    posts: []
  },
  {
    id: uuidv4(),
    username: 'janedoe',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    bio: 'Bookworm and aspiring chef',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    coverPhoto: 'https://picsum.photos/id/1019/1000/300',
    friends: [],
    posts: []
  },
  {
    id: uuidv4(),
    username: 'bobsmith',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    bio: 'Tech geek and gamer',
    profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg',
    coverPhoto: 'https://picsum.photos/id/1020/1000/300',
    friends: [],
    posts: []
  },
  {
    id: uuidv4(),
    username: 'alicejohnson',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    bio: 'Nature lover and photographer',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    coverPhoto: 'https://picsum.photos/id/1021/1000/300',
    friends: [],
    posts: []
  },
  {
    id: uuidv4(),
    username: 'charliebrooks',
    name: 'Charlie Brooks',
    email: 'charlie.brooks@example.com',
    bio: 'Fitness enthusiast and nutrition coach',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
    coverPhoto: 'https://picsum.photos/id/1022/1000/300',
    friends: [],
    posts: []
  }
];

export default fakeProfiles;
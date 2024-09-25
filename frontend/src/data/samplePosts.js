const samplePosts = [
    {
        id: 1,
        user: {
            name: 'John Doe',
            profilePicture: 'https://via.placeholder.com/50'
        },
        content: 'Had a great day hiking!',
        image: 'https://via.placeholder.com/500',
        reactions: {
            like: 10,
            love: 5,
            haha: 2,
            wow: 1,
            sad: 0,
            angry: 0
        },
        comments: [
            {
                user: 'Jane Smith',
                text: 'Looks amazing!'
            },
            {
                user: 'Alice Johnson',
                text: 'Wish I could join!'
            }
        ]
    },
    {
        id: 2,
        user: {
            name: 'Jane Smith',
            profilePicture: 'https://via.placeholder.com/50'
        },
        content: 'Just finished reading a great book!',
        image: 'https://via.placeholder.com/500',
        reactions: {
            like: 15,
            love: 8,
            haha: 1,
            wow: 3,
            sad: 0,
            angry: 0
        },
        comments: [
            {
                user: 'John Doe',
                text: 'What book was it?'
            }
        ]
    }
];

export default samplePosts;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/media', upload.single('file'), (req, res) => {
    const { sender, receiver } = req.body;
    const newMessage = {
        sender,
        receiver,
        content: req.file.path,
        timestamp: new Date(),
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});
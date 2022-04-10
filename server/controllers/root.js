export const API = async (req, res) => {
    try {
        res.status(200).json({message: 'CAN connect API'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
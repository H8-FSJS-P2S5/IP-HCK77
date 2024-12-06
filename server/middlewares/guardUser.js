const { MyList } = require("../models");
module.exports = async function guardUser(req, res, next) {
    try {
        // if (req.user.role.toLowerCase() === "admin") {
        //   next();
        //   return;
        // }
        const myListId = Number(req.params.id);
        const userId = Number(req.user.id);
        
        const myList = await MyList.findByPk(myListId);
        console.log("guard", myList, userId)

        if (!myList) {
            res.status(404).json({ message: "MyList Not Found" });
            return;
        }

        if (myList.UserId !== userId) {
            res.status(403).json({ message: "Forbidden Access" });
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
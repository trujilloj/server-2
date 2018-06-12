const express = require("express")
const app = express()
const instructors = require("./data/instructors.js")
const cors = require("cors")
app.use(cors())

function getId(instructors, number) {
  return instructors.filter(instructor => {
    if (instructor.id == number) {
      return instructor
    } else {
      return null
    }
  })[0]
}

app.get("/", (req, res, next) =>
  res.status(200).json({
    data: instructors
  })
)

app.get("/:id", (req, res) => {
  var record = getId(instructors, req.params.id)
  if (record) {
    res.status(200).json({
      data: record
    })
  } else {
    res.status(404).json({
      error: {
        message: "No record found!"
      }
    })
  }
})

app.listen(process.env.PORT || 3000)

const Messages = require("../models/dbMessages");
const Group = require("../models/group");
const User = require("../models/user");
var randomstring = require("randomstring");

module.exports = function (params) {
  const api = params.api;

  api.post("/messages/new", async (req, res) => {
    const dbmessage = req.body;

    Messages.create(dbmessage, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });

  api.post("/messages/sync", async (req, res) => {
    Messages.find({ group: req.body.group }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });

    api.post("/group/new", async (req, res) => {
      Group.findOne({ group_name: req.body.group_name }, (err, gp) => {
        if (err) {
          res.json({
            status: "-1",
            msg: "An error occured",
          });
        } else {
          if (gp) {
            res.json({
              status: "0",
              msg: "group with the name already exist",
            });
          } else {
            console.log(req.body);
            const gp = new Group(req.body);
            gp.created_at = new Date().toDateString();
            gp.group_code =
              "GRP-" +
              randomstring.generate({
                length: 6,
                charset: "alphanumeric",
              });
            gp.default = false;
            gp.save((err) => {
              if (err) {
                res.json({
                  status: "-1",
                  msg: "An error occured",
                });
              } else {
                User.findOne({email:req.body.email},(err,user) => {
                  user.joined_groups = [...user.joined_groups,{group_name:gp.group_name,image_url:gp.image_url,description:gp.description,group_code:gp.group_code}];
                  if(!err){
                    user.save((err) => {
                      if(err){
                        console.log(err);
                      }else{
                        console.log("group added");
                      }
                    })
                  }else{
                    console.log(err);
                  }
                })
                res.json({
                  status: "1",
                  msg: "created",
                });
              }
            });
          }
        }
      });
    });

    api.get("/group/all", async (req, res) => {
      Group.find({}, (err, grp) => {
        if (err) {
          res.json({
            status: "-1",
            msg: "An error occured",
          });
        } else {
          if (grp.length > 0) {
            res.json({
              status: "1",
              msg: grp,
            });
          } else {
            res.json({
              status: "0",
              msg: "no groups found",
            });
          }
        }
      });
    });

    api.post("/group/find", async (req, res) => {
      Group.findOne({ group_name: req.body.group_name }, (err, gp) => {
        if (err) {
          res.json({
            status: "-1",
            msg: "An error occured",
          });
        } else {
          if (gp) {
            res.json({
              status: "1",
              msg: gp,
            });
          } else {
            res.json({
              status: "0",
              msg: "not found",
            });
          }
        }
      });
    });

    api.get("/users/all", async (req, res) => {
      User.find({}, (err, users) => {
        if (err) {
          res.json({
            status: "-1",
            msg: "An error occured",
          });
        } else {
          if (users.length > 0) {
            res.json({
              status: "1",
              msg: users,
            });
          } else {
            res.json({
              status: "0",
              msg: "no users found",
            });
          }
        }
      });
    });

    api.post("/login", async (req, res) => {
      User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
          res.json({
            status: "-1",
            msg: "An error occured",
          });
          console.log(err);
        } else {
          if (!user) {
            const newuser = new User(req.body);
            await Group.find({ default: true }, (err, grps) => {
              if (err) {
                console.log(err);
              } else {
                if (grps) {
                  grps.forEach((gp) => {
                    const newgrp = {
                      group_name: gp.group_name,
                      group_code: gp.group_code,
                      image_url: gp.image_url,
                      description: gp.description,
                    };
                    newuser.joined_groups = [...newuser.joined_groups, newgrp];
                    gp.members = gp.members + 1;
                    gp.save();
                  });
                }
              }
            });
            newuser.save((err) => {
              if (err) {
                console.log(err);
                res.json({
                  status: "-1",
                  msg: "An error occured",
                });
                console.log(err);
              } else {
                res.json({
                  status: "1",
                  msg: newuser,
                });
              }
            });
          } else {
            res.json({
              status: "1",
              msg: user,
            });
          }
        }
      });
    });

    api.post("/group/join", async (req, res) => {
      Group.findOne({ group_code: req.body.group_code }, async (err, gp) => {
        if (err) {
          res.json({
            status: "-1",
            msg: "An error occured",
          });
        } else {
          if (gp) {
            const newgrp = {
              group_name: gp.group_name,
              group_code: gp.group_code,
              image_url: gp.image_url,
              description: gp.description,
            };
            User.findOne({ email: req.body.email }, (err, user) => {
              if (err) {
                res.json({
                  status: "-1",
                  msg: "An error occured",
                });
              } else {
                if (user) {
                  user.joined_groups = [...user.joined_groups, newgrp];
                  user.save((err) => {
                    if (!err) {
                      gp.members = gp.members + 1;
                      gp.save();
                      res.json({
                        status: "1",
                        msg: "success",
                      });
                    } else {
                      res.json({
                        status: "-1",
                        msg: "An error occured while saving user",
                      });
                    }
                  });
                }else{
                  res.json({
                    status: "0",
                    msg: "invalid user",
                  });
                }
              }
            });
          } else {
            res.json({
              status: "0",
              msg: "choose a valid code",
            });
          }
        }
      });
    });
  });
};

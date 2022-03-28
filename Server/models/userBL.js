const User = require('./userModel');

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUser = id => {
  return new Promise((resolve, reject) => {
    User.findById(id, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUserByNameOrEmail = word => {
  return new Promise((resolve, reject) => {
    //start with "name"
    User.find(
      { Name: { $regex: 'word' } || { Email: { $regex: 'word' } } },
      function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const addUser = obj => {
  return new Promise((resolve, reject) => {
    let user = new User({
      ID: obj.ID,
      Name: obj.Name,
      Email: obj.Email,
      Street: obj.Street,
      City: obj.City,
      Zipcode: obj.Zipcode,
      Task: obj.Task,
      Posts: obj.Posts
    });

    user.save(function(err) {
      if (err) {
        reject(err);
      } else {
        resolve('Created!');
      }
    });
  });
};

const updateUser = (id, obj) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      {
        ID: obj.ID,
        Name: obj.Name,
        Email: obj.Email,
        Street: obj.Street,
        City: obj.City,
        Zipcode: obj.Zipcode,
        Tasks: obj.Tasks,
        Posts: obj.Posts
      },
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve('Updated!');
        }
      }
    );
  });
};

const deleteUser = id => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve('Deleted!');
      }
    });
  });
};

module.exports = {
  getAllUsers,
  getUser,
  getUserByNameOrEmail,
  addUser,
  updateUser,
  deleteUser
};

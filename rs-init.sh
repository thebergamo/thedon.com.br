#!/bin/bash

mongosh <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
      {
        _id: 0,
        host: "127.0.0.1:27021",
        priority: 3
      },
      {
        _id: 1,
        host: "127.0.0.1:27022",
        priority: 1
      },
      {
        _id: 2,
        host: "127.0.0.1:27023",
        priority: 2
      }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF

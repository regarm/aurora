#!/bin/bash
mongoimport --db aurora --collection contest --file schema/contest.json
mongoexport --db aurora --collection counter --file schema/counter.json
mongoimport --db aurora --collection file --file schema/file.json
mongoimport --db aurora --collection lang --file schema/lang.json
mongoimport --db aurora --collection problem --file schema/problem.json
mongoexport --db aurora --collection setting --file schema/setting.json
mongoimport --db aurora --collection submission --file schema/submission.json
mongoimport --db aurora --collection user --file schema/user.json

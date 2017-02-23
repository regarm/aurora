#!/bin/bash
mongoexport --db aurora -c contest --out schema/contest.json
mongoexport --db aurora -c io --out schema/io.json
mongoexport --db aurora -c lang --out schema/lang.json
mongoexport --db aurora -c problem --out schema/problem.json
mongoexport --db aurora -c submission --out schema/submission.json
mongoexport --db aurora -c user --out schema/user.json

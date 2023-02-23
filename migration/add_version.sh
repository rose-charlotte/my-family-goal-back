sqitch add 1.init_db -n "create domain, table and index"
sqitch add 2.add_constraint -n "Add constraint ON DELETE CASCADE on table user_has_family"
const { doDBQueryBuffalorugby } = useQuery()
export const historyService = {
  getAll,
  getAllCurrent,
  getOne,
  editOne,
  addOne,
  getYears,
  deleteOne,
  changeStatus,
}

async function getYears() {
  const sql = `SELECT
								history_year
							FROM
								inbrc_history
							WHERE
								deleted != 1
							ORDER BY
								history_year`

  const years = await doDBQueryBuffalorugby(sql)
  return years
}

async function getAll() {
  const sql = `SELECT
									history_id,
									history_id as id,
									history_year as title,
									playoffs,
									outbound_tours,
									inbound_tours,
									other,
									upstate_tourney_location,
									upstate_tourney_winner,
									status,
									deleted,
									deleted_dt,
									modified_dt,
									modified_dt as dt
                FROM inbrc_history
                WHERE deleted = 0
                ORDER BY title ASC`

  const history = await doDBQueryBuffalorugby(sql)
  return history
}

async function getAllCurrent() {
  const sql = `SELECT
										history_id,
										history_id as id,
										history_year,
										history_year as title,
										playoffs,
										outbound_tours,
										inbound_tours,
										other,
										upstate_tourney_location,
										upstate_tourney_winner,
										status,
										deleted,
										deleted_dt,
										modified_dt,
										modified_dt as dt
									FROM inbrc_history
									WHERE
										deleted = 0
										AND
										STATUS = 1`

  const history = await doDBQueryBuffalorugby(sql)
  return history
}

async function getOne(id) {
  const sql = `SELECT
									history_id,
									history_id as id,
									history_year,
									playoffs,
									outbound_tours,
									inbound_tours,
									other,
									upstate_tourney_location,
									upstate_tourney_winner
							from
								inbrc_history
							where
								history_id=${id}`

  const history = await doDBQueryBuffalorugby(sql)
  return history[0]
}

async function addOne({
  history_year,
  playoffs,
  outbound_tours,
  inbound_tours,
  other,
  upstate_tourney_location,
  upstate_tourney_winner,
}) {
  const sql = `INSERT INTO
								inbrc_history
              SET
								history_year=?,
								playoffs=?,
								outbound_tours=?,
								inbound_tours=?,
								other=?,
								upstate_tourney_location=?,
								upstate_tourney_winner=?,
								STATUS = 1,
								deleted = 0,
								created_dt = NOW(),
								modified_dt = NOW()`

  let inserts = []
  inserts.push(
    history_year,
    playoffs,
    outbound_tours,
    inbound_tours,
    other,
    upstate_tourney_location,
    upstate_tourney_winner,
  )
  const history = await doDBQueryBuffalorugby(sql, inserts)
  return history
}

async function editOne({
  history_year,
  playoffs,
  outbound_tours,
  inbound_tours,
  other,
  upstate_tourney_location,
  upstate_tourney_winner,
  id,
}) {
  const sql = `UPDATE inbrc_history SET
									history_year = ?,
									playoffs=?,
									outbound_tours=?,
									inbound_tours=?,
									other=?,
									upstate_tourney_location=?,
									upstate_tourney_winner=?,
									modified_dt= NOW()
								WHERE history_id = ?`
  let inserts = []

  inserts.push(
    history_year,
    playoffs,
    outbound_tours,
    inbound_tours,
    other,
    upstate_tourney_location,
    upstate_tourney_winner,
    id,
  )
  const history = await doDBQueryBuffalorugby(sql, inserts)
  return history
}

async function deleteOne(id) {
  const sql = `UPDATE inbrc_history SET deleted=1, deleted_dt=NOW() WHERE history_id=${id}`
  const history = await doDBQueryBuffalorugby(sql)
  return history
}

async function changeStatus({ id, status }) {
  const sql =
    `UPDATE inbrc_history SET STATUS = "` +
    status +
    `" WHERE history_id  = ` +
    id
  const history = await doDBQueryBuffalorugby(sql)
  return history
}

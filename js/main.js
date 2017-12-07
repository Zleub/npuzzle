console.log('Hello Javascript !')

let colors = require('./colors.js')
let print = (e) => process.stdout.write(e)
let linear_to_cartesian = (i) => ({x: i % width, y: Math.floor(i / width)})
let lc = linear_to_cartesian

let start = 'S'
let end = 'E'

let width = 10
let height = 10
let map = []

for (var i = 0; i < width; i++) {
	for (var j = 0; j < height; j++) {
		map.push('.')
	}
}

let print_map = (map, padding = 2, open = [], close = [], current) => map.forEach( (e, i) => {
	if (e == start)
		print(`${e}`.padEnd(padding, ' ').Purple)
	else if (i == current)
		print(`${e}`.padEnd(padding, ' ').Blue)
	else if (e == end)
		print(`${e}`.padEnd(padding, ' ').Teal)
	else if (close.some(_ => _ == i))
		print(`${e}`.padEnd(padding, ' ').Red)
	else if (open.some(_ => _ == i))
		print(`${e}`.padEnd(padding, ' ').Green)
	else
		print(`${e}`.padEnd(padding, ' '))

	if ((i + 1) % width == 0)
		print('\n')
})

let heuristic = (A, B) => ((B.x - A.x) ** 2) + ((B.y - A.y) ** 2)
let pythagoras = (A,B) =>// Math.sqrt(
	Math.pow(B.x - A.x, 2) +
	Math.pow(B.y - A.y, 2)
//)
let manhattan = (A, B) => ((B.x - A.x) + (B.y - A.y))

map[14] = start
map[6 + height * 6] = end

map[2 + height * 3] = 'X'
map[3 + height * 3] = 'X'
map[4 + height * 3] = 'X'
map[5 + height * 3] = 'X'
map[6 + height * 3] = 'X'
map[7 + height * 3] = 'X'
map[8 + height * 3] = 'X'
map[9 + height * 3] = 'X'
map[10 + height * 3] = 'X'

print_map(map)

let get_something = (_) => (map) => {
	let r = map.reduce( (p, e, i) => {
		if (e == _)
			p.push([e, i])
		return p
	}, [] )

	r.length > 1 ? print(`More than one ${_}`) : r = r[0]
	return r
}

let get_start = get_something('S')
let get_end = get_something('E')
let get_neighbors = (i) => [
	i - height,
	i + 1,
	i + height,
	i - 1
]

let solve = (map, start = get_start(map)[1], end = get_end(map)[1]) => {
	let close = []
	let open = [start]
	let path = map.map(e => Number.POSITIVE_INFINITY)
	let score = map.map(e => Number.POSITIVE_INFINITY)
	let _score = score.map(e => e)

	score[start] = 0
	_score[start] = heuristic( lc(start), lc(end) )
	print_map(score, 9)
	print("\n")
	print_map(_score, 9)

	let _solve = () => {
		let current = _score.reduce( (p, e, i) => {
			if (e < p[0] && open.some(_ => _ == i))
				return [e, i]
			return p
		}, [Number.POSITIVE_INFINITY, 0] )

		if (current[1] == end) {
			print('END\n')
			process.exit()
		}

		if (open.filter( (e) => e != current[1] )[0]) {
			close.push(current[1])
			open = open.filter( (e) => e != current[1] )
		}

		get_neighbors(current[1]).forEach( e => {
			if (close.some(_ => _ == e))
				return
			if (!open.some(_ => _ == e))
				open.push(e)

			if (map[e] == 'X')
				return

			let test = score[current[1]] + heuristic( lc(current[1]), lc(e) )
			if (test >= score[e]) {
				return
			}

			map[e] = '*'
			path[e] = current[1]
			score[e] = test
			_score[e] = score[e] + heuristic(lc(e), lc(end))

		})

		if (open.length > 0) {
			print("MAP\n".blue)
			print_map(map, 2, open, close, current[1])
			print('\n')
			setTimeout( _solve, 200 )
		}
		else {
			print('FAILURE\n')
		}
	}
	_solve()
}

solve(map)

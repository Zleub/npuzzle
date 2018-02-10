use std::fs::File;
use std::io::prelude::*;

fn die(msg: &str) {
    println!("{}", msg);
    std::process::exit(1)
}

fn main() {
    println!("Hello Npuzzle !");

    let mut file = File::open("bar.txt").ok().expect("Error!\n");
    let mut contents = String::new();
    file.read_to_string(&mut contents).ok().expect("Error\n");

    let iter = contents.lines();
    let mut v : Vec<Vec<&str>> = iter.map(|e| {
        let a = e.split_whitespace();
        let mut b : Vec<&str> = a.collect();

        match e.split_whitespace().position( |x| x.starts_with("#") ) {
            Some(x) => { b.split_off(x) ; b },
            None => b
        }
    } ).filter(|e| e.len() != 0).collect();

    match v.len() {
        0 => die("Provide a valide file"),
        _ => match v[0].len() {
            1 => match v[0][0].parse().ok().unwrap_or(-1) {
                -1 => die("Provide a number on the first line."),
                x => match v.len() as i32 - 1 {
                    y if x == y => v.split_off(1).iter().for_each(|e| match e.len() as i32 {
                        z if x == z => e.iter().for_each(|e| match e.contains(char::is_numeric) {
                            true => (),
                            false => die("Should be numeric")
                        } ),
                        _ => die("ko2")
                    }) ,
                    _ => die("ko")
                }
            },
            _ => die("Provide a valide file")
        }
    }

    // println!("---- ----");
    // v.for_each(|e| println!("{:?}", e))
}

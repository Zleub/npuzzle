use std::fs::File;
use std::io::prelude::*;

fn main() {
    println!("Hello Npuzzle !");

    let mut file = File::open("bar.txt").ok().expect("Error!\n");
    let mut contents = String::new();
    file.read_to_string(&mut contents).ok().expect("Error\n");


    let iter = contents.lines();
    let v = iter.map(|e| {
        let mut a = e.split_whitespace();
        println!("{}", e);
        match a.position( |x| x.contains('#') ) {
            Some(x) => {
                println!("{}", x);
                let mut c: Vec<&str> = a.collect();
                let _c = c.split_off(x);
                println!("c: {:?}", c);
                println!("_c: {:?}", _c);

                _c
            },
            None => a.collect()
        }
    } );

    println!("---- ----");
    v.for_each(|e| println!("{:?}", e))
}

#[cfg(feature = "does_not_compile")]
mod does_not_compile;

fn not_used() {
    println!("Not used");
}

fn main() {
    println!("Hello, world!");
}

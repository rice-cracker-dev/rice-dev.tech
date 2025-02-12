{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {nixpkgs, ...}: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    nodejs = pkgs.nodejs_22;
  in {
    devShells.${system}.default = pkgs.mkShell {
      nativeBuildInputs = [
        nodejs
        (pkgs.pnpm.override {
          inherit nodejs;
        })
      ];
    };
  };
}

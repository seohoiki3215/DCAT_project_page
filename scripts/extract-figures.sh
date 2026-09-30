#!/usr/bin/env bash
set -eu
cd "$(dirname "$0")/.."
mkdir -p assets/figures
# Poppler; coordinates are pixels at 300 DPI, measured against the supplied PDF.
pdftoppm -f 4 -l 4 -r 300 -x 440 -y 300 -W 1670 -H 560 -png -singlefile DCAT.pdf assets/figures/alignment-correlation
pdftoppm -f 9 -l 9 -r 300 -x 440 -y 300 -W 1670 -H 630 -png -singlefile DCAT.pdf assets/figures/alignment-layerwise
pdftoppm -f 2 -l 2 -r 300 -x 1430 -y 650 -W 680 -H 685 -png -singlefile DCAT.pdf assets/figures/paper-concept

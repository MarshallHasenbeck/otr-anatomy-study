#!/bin/sh
# Bundles src/ and the converted 3D model into one self-contained file: "OTR Anatomy Study.html"
cd "$(dirname "$0")" || exit 1
OUT="OTR Anatomy Study.html"
{
cat <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>OTR Anatomy Study</title>
<style>
EOF
cat src/style.css
cat <<'EOF'
</style>
</head>
<body>
<aside>
  <div class="brand"><b>OTR Anatomy Study</b><span>Anatomy and NBCOT OTR exam prep</span></div>
  <nav id="nav">
    <button data-t="study" class="on">Study</button>
    <button data-t="quiz">Quiz</button>
    <button data-t="atlas">Body atlas</button>
    <button data-t="v3">3D model</button>
    <button data-t="lib">Library</button>
    <button data-t="progress">Progress <span id="fbadge" class="badge"></span></button>
  </nav>
  <div class="foot">Study aid only. When it disagrees with your course or prep materials, trust those.</div>
</aside>
<div class="content"><main id="main"></main>
<div id="v3wrap" style="display:none">
  <div class="bar">
    <button class="chip on" data-layer="m">Muscles</button><button class="chip on" data-layer="b">Bones</button><button class="chip on" data-layer="c">Discs and membranes</button><button class="chip on" data-layer="j">Joints</button>
    <button class="chip" id="fade">See-through muscles</button>
    <button class="btn" id="showAll" disabled>Show all</button>
    <input type="search" id="find" list="names" placeholder="Find a muscle or bone…"><datalist id="names"></datalist>
  </div>
  <div class="v3">
    <div class="stage"><canvas id="gl"></canvas><div id="tip"></div><div id="loading">Loading the 3D model…</div>
      <div class="views"><button class="btn" data-view="home">Reset</button><button class="btn" data-view="front">Front</button><button class="btn" data-view="back">Back</button><button class="btn" data-view="left">Left side</button><button class="btn" data-view="right">Right side</button></div></div>
    <div class="panel" id="v3panel"></div>
  </div>
  <div class="credit">3D model: BodyParts3D, © The Database Center for Life Science, licensed under CC Attribution-Share Alike 2.1 Japan (current releases: CC Attribution 4.0 International). Meshes were simplified for this viewer. The source model is one male body and does not include latissimus dorsi, rectus abdominis, the internal oblique, transversus abdominis, quadratus lumborum, multifidus, or the chewing muscles (masseter, temporalis, pterygoids), and it has almost no ligaments. Use the flashcards and the 2D body atlas for those.</div>
</div>
</div>
<script>
EOF
cat src/data.js src/plain.js src/plain2.js src/common.js src/plain3.js src/clinical.js src/nbcot.js src/gloss.js src/figure.js src/app.js
printf '\nconst MODEL='
cat 3d/model/model.json
printf ';\nconst MODEL_B64="'
base64 -i 3d/model/model.bin | tr -d '\n'
printf '";\n'
cat 3d/viewer3d.js
cat <<'EOF'
</script>
</body>
</html>
EOF
} > "$OUT"
cp "$OUT" index.html
echo "Built $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)"

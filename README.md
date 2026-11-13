# OTR Anatomy Study

A free, offline-capable study app for functional anatomy, built for occupational therapy board prep.

**Open it:** https://marshallhasenbeck.github.io/otr-anatomy-study/

## What it has

- **Study**: flashcards for muscles (origin, insertion, action, nerve), bone landmarks, joints, ligaments, movements, terminology, OT clinical anatomy, and a general NBCOT OTR exam prep deck (models, neuro, safety precautions, assessments, pediatrics, mental health, ethics). Missed cards come back first.
- **Quiz**: multiple choice generated from the same facts, including "name the highlighted muscle".
- **Body atlas**: clickable front and back figures (female and male proportions), muscles and skeleton.
- **3D model**: rotate, zoom, and click a real scan-based body for the same card info.
- **Library**: searchable reference, with common names and plain-language definitions.
- **Progress**: tracking, plus backup and restore to a file.

Progress is stored in the browser on each device. Use **Progress → Save backup file** to protect it or move it.

## Accuracy

This is a study aid, not a primary reference. Facts follow standard anatomy texts, but sources disagree on some details (spinal root levels, splint angles, ROM norms, prime mover versus assistant). When this app disagrees with your course or prep materials, trust those.

The 3D model is one male body and is missing some muscles (latissimus dorsi, rectus abdominis, internal oblique, transversus abdominis, quadratus lumborum, multifidus, the chewing muscles) and nearly all ligaments.

## Credits

3D model: **BodyParts3D, © The Database Center for Life Science**, licensed under CC Attribution-Share Alike 2.1 Japan (current releases: CC Attribution 4.0 International). Meshes were simplified for this viewer; the converted model in `3d/model/` is shared under the same terms.

Not affiliated with or endorsed by NBCOT.

## Building

`sh build.sh` bundles `src/`, `3d/viewer3d.js`, and `3d/model/` into a single `index.html`. No dependencies.

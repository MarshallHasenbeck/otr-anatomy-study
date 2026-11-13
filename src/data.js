/* ============================ DATA ============================
   Muscles: m(region, name, origin, insertion, action, nerve, tags)
   Tags: "Joint: Movement" separated by ;  A leading ~ marks an assist (not a prime mover).
   Compiled from standard references (Moore, Gray's, Kendall, OpenStax). Textbooks differ on
   some details (mostly spinal root levels), so course materials always win.
*/
const MUSCLES = [];
function m(r,n,o,i,a,v,t){MUSCLES.push({r,n,o,i,a,v,t:t?t.split(";").map(s=>s.trim()).filter(Boolean):[]})}

// ---- Scapula and shoulder girdle
m("Scapula","Trapezius","Upper: external occipital protuberance, superior nuchal line, ligamentum nuchae. Middle: spinous processes C7 to T3. Lower: spinous processes T4 to T12.","Upper: lateral third of clavicle. Middle: acromion and spine of scapula. Lower: root (medial end) of spine of scapula.","Upper: elevates scapula, upward rotation. Middle: retracts. Lower: depresses, upward rotation. Upper fibers also extend and laterally flex the neck.","Spinal accessory nerve (CN XI), plus C3 to C4 (sensory)","Scapula: Elevation; Scapula: Retraction; Scapula: Depression; Scapula: Upward rotation; ~Neck: Extension; ~Neck: Lateral flexion");
m("Scapula","Levator scapulae","Transverse processes of C1 to C4.","Superior angle and upper medial border of scapula.","Elevates scapula, downward rotation of scapula. Assists neck lateral flexion.","Dorsal scapular nerve (C5) and C3 to C4","Scapula: Elevation; Scapula: Downward rotation; ~Neck: Lateral flexion");
m("Scapula","Rhomboids (major and minor)","Minor: ligamentum nuchae, spinous processes C7 to T1. Major: spinous processes T2 to T5.","Medial border of scapula (minor at the root of the spine, major below the spine).","Retracts scapula, downward rotation, assists elevation.","Dorsal scapular nerve (C4 to C5)","Scapula: Retraction; Scapula: Downward rotation; ~Scapula: Elevation");
m("Scapula","Serratus anterior","Outer surfaces of ribs 1 to 8 (or 9).","Anterior surface of the medial border of scapula.","Protracts scapula, upward rotation, holds scapula against the thorax. Weakness gives a winged scapula.","Long thoracic nerve (C5 to C7)","Scapula: Protraction; Scapula: Upward rotation");
m("Scapula","Pectoralis minor","Anterior surfaces of ribs 3 to 5 (some sources list ribs 2 to 4).","Coracoid process of scapula.","Depresses and protracts scapula, downward rotation, anterior tilt. Elevates ribs in forced inspiration.","Medial pectoral nerve (C8 to T1)","Scapula: Depression; ~Scapula: Protraction; ~Scapula: Downward rotation");
m("Scapula","Subclavius","Junction of 1st rib and its costal cartilage.","Inferior surface of the middle third of the clavicle.","Depresses clavicle and stabilizes the sternoclavicular joint.","Nerve to subclavius (C5 to C6)","");

// ---- Shoulder (glenohumeral)
m("Shoulder","Pectoralis major","Clavicular head: medial half of clavicle. Sternocostal head: sternum and costal cartilages of ribs 1 to 6 (or 1 to 7), plus the external oblique aponeurosis.","Lateral lip of the intertubercular (bicipital) groove of humerus.","Adduction, internal rotation, horizontal adduction. Clavicular head flexes the shoulder; sternocostal head extends it from a flexed position.","Medial and lateral pectoral nerves (C5 to T1)","Shoulder: Adduction; Shoulder: Internal rotation; Shoulder: Horizontal adduction; ~Shoulder: Flexion");
m("Shoulder","Latissimus dorsi","Spinous processes of T7 to T12, lumbar and sacral spinous processes via the thoracolumbar fascia, posterior iliac crest, ribs 9 to 12, inferior angle of scapula.","Floor of the intertubercular groove of humerus.","Extension, adduction, internal rotation. With the arms fixed it lifts the trunk (crutch walking, transfers, wheelchair push-ups for pressure relief).","Thoracodorsal nerve (C6 to C8)","Shoulder: Extension; Shoulder: Adduction; Shoulder: Internal rotation");
m("Shoulder","Deltoid","Anterior: lateral third of clavicle. Middle: acromion. Posterior: spine of scapula.","Deltoid tuberosity of humerus.","Anterior: flexion, internal rotation, horizontal adduction. Middle: abduction (prime mover after about the first 15 degrees). Posterior: extension, external rotation, horizontal abduction.","Axillary nerve (C5 to C6)","Shoulder: Abduction; Shoulder: Flexion; Shoulder: Extension; Shoulder: Horizontal abduction; ~Shoulder: Horizontal adduction; ~Shoulder: Internal rotation; ~Shoulder: External rotation");
m("Shoulder","Teres major","Inferior angle and lower lateral border of scapula (posterior surface).","Medial lip of the intertubercular groove of humerus.","Extension, adduction, internal rotation. Called the 'little helper' of latissimus dorsi.","Lower subscapular nerve (C5 to C6; some references list C5 to C7)","Shoulder: Extension; Shoulder: Adduction; Shoulder: Internal rotation");
m("Shoulder","Supraspinatus (rotator cuff)","Supraspinous fossa of scapula.","Greater tubercle of humerus (superior facet).","Initiates abduction (first about 15 degrees) and compresses the humeral head in the glenoid. Most commonly torn cuff muscle.","Suprascapular nerve (C5 to C6)","Shoulder: Abduction");
m("Shoulder","Infraspinatus (rotator cuff)","Infraspinous fossa of scapula.","Greater tubercle of humerus (middle facet).","External rotation, stabilizes the humeral head.","Suprascapular nerve (C5 to C6)","Shoulder: External rotation; ~Shoulder: Horizontal abduction");
m("Shoulder","Teres minor (rotator cuff)","Upper two thirds of the lateral border of scapula.","Greater tubercle of humerus (inferior facet).","External rotation, weak adduction, stabilizes the humeral head.","Axillary nerve (C5 to C6)","Shoulder: External rotation; ~Shoulder: Adduction; ~Shoulder: Horizontal abduction");
m("Shoulder","Subscapularis (rotator cuff)","Subscapular fossa (anterior surface of scapula).","Lesser tubercle of humerus.","Internal rotation, anterior stability of the humeral head.","Upper and lower subscapular nerves (C5 to C6, sometimes C7)","Shoulder: Internal rotation");
m("Shoulder","Coracobrachialis","Apex of coracoid process.","Middle third of the medial humerus.","Assists shoulder flexion and adduction.","Musculocutaneous nerve (C5 to C7)","~Shoulder: Flexion; ~Shoulder: Adduction");

// ---- Arm
m("Arm","Biceps brachii","Long head: supraglenoid tubercle. Short head: apex of coracoid process.","Radial tuberosity and bicipital aponeurosis.","Elbow flexion, forearm supination (strongest with the elbow flexed), weak shoulder flexion.","Musculocutaneous nerve (C5 to C6)","Elbow: Flexion; Forearm: Supination; ~Shoulder: Flexion");
m("Arm","Brachialis","Anterior distal half of the humerus.","Ulnar tuberosity and coronoid process of ulna.","Elbow flexion in every forearm position (the 'workhorse' flexor).","Musculocutaneous nerve (C5 to C6), with a small radial nerve contribution","Elbow: Flexion");
m("Arm","Triceps brachii","Long head: infraglenoid tubercle. Lateral head: posterior humerus above the radial groove. Medial head: posterior humerus below the radial groove.","Olecranon process of ulna.","Elbow extension. Long head also extends and adducts the shoulder.","Radial nerve (C6 to C8)","Elbow: Extension; ~Shoulder: Extension; ~Shoulder: Adduction");
m("Arm","Anconeus","Posterior surface of lateral epicondyle of humerus.","Lateral olecranon and proximal posterior ulna.","Assists elbow extension, stabilizes the ulna during pronation and supination.","Radial nerve (C7 to C8)","~Elbow: Extension");

// ---- Forearm
m("Forearm","Brachioradialis","Upper two thirds of the lateral supracondylar ridge of humerus.","Styloid process of radius (distal).","Elbow flexion, strongest in the mid position (thumb up). Returns the forearm to neutral from either pronation or supination.","Radial nerve (C5 to C6)","Elbow: Flexion");
m("Forearm","Pronator teres","Humeral head: medial epicondyle. Ulnar head: coronoid process.","Middle of the lateral surface of the radius.","Forearm pronation, weak elbow flexion.","Median nerve (C6 to C7)","Forearm: Pronation; ~Elbow: Flexion");
m("Forearm","Pronator quadratus","Distal quarter of the anterior ulna.","Distal quarter of the anterior radius.","Forearm pronation (primary pronator, active in all elbow positions).","Anterior interosseous nerve, median (C8 to T1)","Forearm: Pronation");
m("Forearm","Supinator","Lateral epicondyle, supinator crest of ulna, radial collateral and annular ligaments.","Proximal lateral surface of the radius.","Forearm supination (the main supinator when the elbow is extended or no resistance is needed).","Deep branch of radial nerve / posterior interosseous (C6 to C7; root levels vary by source)","Forearm: Supination");
m("Forearm","Flexor carpi radialis","Medial epicondyle (common flexor tendon).","Base of 2nd metacarpal (and a slip to the 3rd).","Wrist flexion, radial deviation.","Median nerve (C6 to C7)","Wrist: Flexion; Wrist: Radial deviation");
m("Forearm","Palmaris longus","Medial epicondyle (common flexor tendon).","Flexor retinaculum and palmar aponeurosis.","Weak wrist flexion, tenses the palmar fascia. Absent in about 15 percent of people.","Median nerve (C7 to C8)","~Wrist: Flexion");
m("Forearm","Flexor carpi ulnaris","Humeral head: medial epicondyle. Ulnar head: olecranon and posterior border of ulna.","Pisiform, hook of hamate, base of 5th metacarpal.","Wrist flexion, ulnar deviation.","Ulnar nerve (C7 to C8)","Wrist: Flexion; Wrist: Ulnar deviation");
m("Forearm","Flexor digitorum superficialis","Humeroulnar head: medial epicondyle, coronoid process. Radial head: anterior oblique line of radius.","Sides of the middle phalanges of digits 2 to 5.","Flexes the PIP joints (and MCP and wrist). Can flex each finger independently.","Median nerve (C7 to T1)","Fingers: PIP flexion; ~Fingers: MCP flexion; ~Wrist: Flexion");
m("Forearm","Flexor digitorum profundus","Proximal three quarters of the anterior and medial ulna, interosseous membrane.","Bases of the distal phalanges of digits 2 to 5.","Flexes the DIP joints (and PIP, MCP, wrist). The only muscle that flexes the DIP.","Digits 2 to 3: anterior interosseous (median). Digits 4 to 5: ulnar nerve (C8 to T1)","Fingers: DIP flexion; ~Fingers: PIP flexion; ~Fingers: MCP flexion; ~Wrist: Flexion");
m("Forearm","Flexor pollicis longus","Anterior surface of the radius and interosseous membrane.","Base of the distal phalanx of the thumb.","Flexes the thumb IP joint (and MCP, CMC).","Anterior interosseous nerve, median (C8 to T1)","Thumb: Flexion");
m("Forearm","Extensor carpi radialis longus","Lower third of the lateral supracondylar ridge of humerus.","Base of 2nd metacarpal (dorsal).","Wrist extension, radial deviation.","Radial nerve (C6 to C7)","Wrist: Extension; Wrist: Radial deviation");
m("Forearm","Extensor carpi radialis brevis","Lateral epicondyle (common extensor tendon).","Base of 3rd metacarpal (dorsal).","Wrist extension, assists radial deviation. Stabilizes the wrist during gripping.","Deep branch of radial nerve (C7 to C8)","Wrist: Extension; ~Wrist: Radial deviation");
m("Forearm","Extensor digitorum","Lateral epicondyle (common extensor tendon).","Extensor expansions of digits 2 to 5 (middle and distal phalanges).","Extends the MCP joints (and PIP, DIP, wrist).","Posterior interosseous nerve, radial (C7 to C8)","Fingers: MCP extension; ~Fingers: IP extension; ~Wrist: Extension");
m("Forearm","Extensor digiti minimi","Lateral epicondyle (common extensor tendon).","Extensor expansion of the 5th digit.","Extends the little finger.","Posterior interosseous nerve, radial (C7 to C8)","~Fingers: MCP extension");
m("Forearm","Extensor indicis","Posterior distal ulna and interosseous membrane.","Extensor expansion of the index finger.","Extends the index finger independently (pointing).","Posterior interosseous nerve, radial (C7 to C8)","~Fingers: MCP extension");
m("Forearm","Extensor carpi ulnaris","Lateral epicondyle and posterior border of ulna.","Base of 5th metacarpal.","Wrist extension, ulnar deviation.","Posterior interosseous nerve, radial (C7 to C8)","Wrist: Extension; Wrist: Ulnar deviation");
m("Forearm","Abductor pollicis longus","Posterior surfaces of ulna, radius, and interosseous membrane.","Base of the 1st metacarpal (radial side).","Thumb abduction (radial abduction), assists extension and radial deviation.","Posterior interosseous nerve, radial (C7 to C8)","Thumb: Abduction; ~Thumb: Extension; ~Wrist: Radial deviation");
m("Forearm","Extensor pollicis brevis","Posterior radius and interosseous membrane.","Base of the proximal phalanx of the thumb.","Extends the thumb MCP and CMC joints.","Posterior interosseous nerve, radial (C7 to C8)","Thumb: Extension");
m("Forearm","Extensor pollicis longus","Posterior middle third of ulna and interosseous membrane.","Base of the distal phalanx of the thumb.","Extends the thumb IP joint (and MCP, CMC), assists adduction.","Posterior interosseous nerve, radial (C7 to C8)","Thumb: Extension; ~Thumb: Adduction");

// ---- Hand
m("Hand","Abductor pollicis brevis","Flexor retinaculum, tubercles of scaphoid and trapezium.","Lateral base of the proximal phalanx of the thumb.","Palmar abduction of the thumb, assists opposition.","Recurrent branch of median nerve (C8 to T1)","Thumb: Abduction; ~Thumb: Opposition");
m("Hand","Flexor pollicis brevis","Flexor retinaculum and trapezium (superficial head); trapezoid and capitate (deep head).","Base of the proximal phalanx of the thumb (lateral).","Flexes the thumb MCP joint.","Superficial head: recurrent median. Deep head: deep branch of ulnar nerve (C8 to T1)","Thumb: Flexion");
m("Hand","Opponens pollicis","Flexor retinaculum and tubercle of trapezium.","Lateral shaft of the 1st metacarpal.","Opposition of the thumb (flexion, abduction, and rotation at the CMC joint). Key for pinch and grasp.","Recurrent branch of median nerve (C8 to T1)","Thumb: Opposition");
m("Hand","Adductor pollicis","Oblique head: capitate and bases of the 2nd and 3rd metacarpals. Transverse head: shaft of 3rd metacarpal.","Medial base of the proximal phalanx of the thumb (via the ulnar sesamoid).","Thumb adduction. Powers key (lateral) pinch.","Deep branch of ulnar nerve (C8 to T1)","Thumb: Adduction");
m("Hand","Abductor digiti minimi","Pisiform and tendon of flexor carpi ulnaris.","Medial base of the proximal phalanx of the 5th digit.","Abducts the little finger.","Ulnar nerve (C8 to T1)","Fingers: Abduction");
m("Hand","Flexor digiti minimi brevis","Hook of hamate and flexor retinaculum.","Base of the proximal phalanx of the 5th digit.","Flexes the little finger MCP joint.","Ulnar nerve (C8 to T1)","~Fingers: MCP flexion");
m("Hand","Opponens digiti minimi","Hook of hamate and flexor retinaculum.","Medial shaft of the 5th metacarpal.","Opposes the little finger toward the thumb (cupping the palm).","Ulnar nerve (C8 to T1)","");
m("Hand","Lumbricals (4)","Tendons of flexor digitorum profundus.","Lateral (radial) side of the extensor expansion of digits 2 to 5.","Flex the MCP joints and extend the IP joints (intrinsic plus position).","Lumbricals 1 to 2: median. Lumbricals 3 to 4: deep branch of ulnar nerve (C8 to T1)","Fingers: MCP flexion; Fingers: IP extension");
m("Hand","Dorsal interossei (4)","Adjacent sides of two metacarpals each.","Extensor expansion and base of the proximal phalanx of digits 2 to 4.","Abduct digits 2 to 4 away from the middle finger (DAB). Assist MCP flexion and IP extension.","Deep branch of ulnar nerve (C8 to T1)","Fingers: Abduction; ~Fingers: MCP flexion; ~Fingers: IP extension");
m("Hand","Palmar interossei (3)","Palmar surfaces of the 2nd, 4th, and 5th metacarpals.","Extensor expansion of the same digit.","Adduct digits 2, 4, and 5 toward the middle finger (PAD). Assist MCP flexion and IP extension.","Deep branch of ulnar nerve (C8 to T1)","Fingers: Adduction; ~Fingers: MCP flexion; ~Fingers: IP extension");

// ---- Neck
m("Neck","Sternocleidomastoid","Sternal head: manubrium. Clavicular head: medial third of clavicle.","Mastoid process and lateral superior nuchal line.","One side: lateral flexion to the same side, rotation to the opposite side. Both sides: neck flexion.","Spinal accessory nerve (CN XI), plus C2 to C3 (sensory)","Neck: Flexion; Neck: Lateral flexion; Neck: Rotation");
m("Neck","Scalenes (anterior, middle, posterior)","Transverse processes of cervical vertebrae.","Anterior and middle: 1st rib. Posterior: 2nd rib.","Neck lateral flexion, assist flexion, elevate the upper ribs in inspiration. The brachial plexus and subclavian artery pass between anterior and middle scalene.","Ventral rami of C3 to C8","Neck: Lateral flexion; ~Neck: Flexion");
m("Neck","Longus colli and longus capitis (deep neck flexors)","Anterior vertebral bodies and transverse processes of cervical and upper thoracic vertebrae.","Upper cervical vertebrae (colli) and basilar occiput (capitis).","Neck flexion, cervical stabilization (chin tuck).","Ventral rami of C1 to C6","Neck: Flexion");
m("Neck","Splenius capitis and cervicis","Ligamentum nuchae and spinous processes C7 to T6.","Mastoid process and superior nuchal line (capitis); transverse processes C1 to C3 (cervicis).","Both sides: neck extension. One side: rotation and lateral flexion to the same side.","Dorsal rami of middle and lower cervical nerves","Neck: Extension; Neck: Rotation; ~Neck: Lateral flexion");
m("Neck","Semispinalis capitis","Transverse processes of C7 to T6 (and articular processes C4 to C6).","Occiput between the superior and inferior nuchal lines.","Neck and head extension. Acting on one side it rotates the head to the opposite side (a few textbooks list the same side).","Dorsal rami of cervical nerves","Neck: Extension");

// ---- Trunk
m("Trunk","Erector spinae (iliocostalis, longissimus, spinalis)","Sacrum, iliac crest, spinous processes, thoracolumbar fascia.","Ribs, transverse processes, mastoid process, spinous processes (varies by column).","Both sides: trunk extension. One side: lateral flexion. Maintains upright posture and controls forward bending eccentrically.","Dorsal rami of spinal nerves","Trunk: Extension; Trunk: Lateral flexion");
m("Trunk","Multifidus","Sacrum, PSIS, transverse processes of lumbar and thoracic vertebrae.","Spinous processes 2 to 4 segments above.","Segmental spinal stabilization, extension, rotation to the opposite side.","Dorsal rami of spinal nerves","~Trunk: Extension; ~Trunk: Rotation");
m("Trunk","Rectus abdominis","Pubic crest and pubic symphysis.","Xiphoid process and costal cartilages 5 to 7.","Trunk flexion, posterior pelvic tilt, compresses the abdomen.","Ventral rami T7 to T12","Trunk: Flexion");
m("Trunk","External oblique","External surfaces of ribs 5 to 12.","Linea alba, anterior iliac crest, pubic tubercle.","Both sides: trunk flexion. One side: lateral flexion to the same side, rotation to the opposite side.","Ventral rami T7 to T12","Trunk: Flexion; Trunk: Lateral flexion; Trunk: Rotation");
m("Trunk","Internal oblique","Thoracolumbar fascia, anterior iliac crest, lateral inguinal ligament.","Ribs 10 to 12, linea alba, pubic crest.","Both sides: trunk flexion. One side: lateral flexion and rotation to the same side.","Ventral rami T7 to L1","Trunk: Flexion; Trunk: Lateral flexion; Trunk: Rotation");
m("Trunk","Transversus abdominis","Costal cartilages 7 to 12, thoracolumbar fascia, iliac crest, inguinal ligament.","Linea alba and pubic crest.","Compresses the abdomen and stabilizes the trunk (deep core 'corset').","Ventral rami T7 to L1","");
m("Trunk","Quadratus lumborum","Iliac crest and iliolumbar ligament.","12th rib and transverse processes of L1 to L4.","Lateral flexion of the trunk, hip hiking (elevates the pelvis), stabilizes the 12th rib.","Ventral rami T12 to L4","Trunk: Lateral flexion; ~Trunk: Extension");
m("Trunk","Diaphragm","Xiphoid process, costal cartilages 7 to 12, L1 to L3 vertebrae (crura).","Central tendon.","Primary muscle of inspiration. Flattens as it contracts, enlarging the thorax.","Phrenic nerve (C3 to C5)","");
m("Trunk","Intercostals (external and internal)","Inferior border of the rib above.","Superior border of the rib below.","External: elevate the ribs in inspiration. Internal: depress the ribs in forced expiration.","Intercostal nerves (T1 to T11)","");

// ---- Hip and thigh
m("Hip & Thigh","Iliopsoas","Psoas major: T12 to L5 vertebral bodies and transverse processes. Iliacus: iliac fossa.","Lesser trochanter of femur.","Hip flexion (strongest hip flexor), slight external rotation. With the legs fixed it flexes the trunk on the hip.","Psoas: ventral rami L1 to L3. Iliacus: femoral nerve (L2 to L3)","Hip: Flexion; ~Hip: External rotation");
m("Hip & Thigh","Rectus femoris","Anterior inferior iliac spine (AIIS) and the ilium above the acetabulum.","Patella via quadriceps tendon, then tibial tuberosity via the patellar ligament.","Hip flexion and knee extension (the only two joint quadriceps muscle).","Femoral nerve (L2 to L4)","Hip: Flexion; Knee: Extension");
m("Hip & Thigh","Vasti (lateralis, medialis, intermedius)","Lateralis: greater trochanter and lateral lip of linea aspera. Medialis: intertrochanteric line and medial lip of linea aspera. Intermedius: anterior and lateral femoral shaft.","Patella via quadriceps tendon, then tibial tuberosity.","Knee extension. Vastus medialis (oblique fibers) helps patellar tracking.","Femoral nerve (L2 to L4)","Knee: Extension");
m("Hip & Thigh","Sartorius","Anterior superior iliac spine (ASIS).","Proximal medial tibia (pes anserinus).","Hip flexion, abduction, external rotation; knee flexion (the cross legged 'tailor' position).","Femoral nerve (L2 to L3)","Hip: Flexion; ~Hip: Abduction; ~Hip: External rotation; ~Knee: Flexion");
m("Hip & Thigh","Tensor fasciae latae","ASIS and anterior iliac crest.","Iliotibial tract, to Gerdy's tubercle of tibia.","Hip abduction, assists flexion and internal rotation, tenses the iliotibial band.","Superior gluteal nerve (L4 to S1)","Hip: Abduction; ~Hip: Flexion; ~Hip: Internal rotation");
m("Hip & Thigh","Gluteus maximus","Posterior ilium, sacrum, coccyx, sacrotuberous ligament.","Gluteal tuberosity of femur and iliotibial tract.","Hip extension (powerful during stairs, rising from a chair) and external rotation.","Inferior gluteal nerve (L5 to S2)","Hip: Extension; Hip: External rotation");
m("Hip & Thigh","Gluteus medius","External surface of ilium between the anterior and posterior gluteal lines.","Lateral surface of greater trochanter.","Hip abduction. Anterior fibers internally rotate. Stabilizes the pelvis in single leg stance (weakness gives Trendelenburg gait).","Superior gluteal nerve (L4 to S1)","Hip: Abduction; ~Hip: Internal rotation");
m("Hip & Thigh","Gluteus minimus","External surface of ilium between the anterior and inferior gluteal lines.","Anterior surface of greater trochanter.","Hip abduction and internal rotation.","Superior gluteal nerve (L4 to S1)","Hip: Abduction; Hip: Internal rotation");
m("Hip & Thigh","Deep lateral rotators (piriformis, obturators, gemelli, quadratus femoris)","Sacrum (piriformis), ischium, and obturator membrane.","Greater trochanter and intertrochanteric crest region of femur.","Hip external rotation and stabilization of the femoral head in the acetabulum. The sciatic nerve usually exits just below piriformis.","Several small nerves from the sacral plexus (L4 to S2); obturator externus by the obturator nerve","Hip: External rotation");
m("Hip & Thigh","Adductor longus","Anterior body of the pubis.","Middle third of the linea aspera.","Hip adduction, assists flexion.","Obturator nerve (L2 to L4)","Hip: Adduction; ~Hip: Flexion");
m("Hip & Thigh","Adductor brevis","Body and inferior ramus of the pubis.","Pectineal line and upper linea aspera.","Hip adduction, assists flexion.","Obturator nerve (L2 to L4)","Hip: Adduction; ~Hip: Flexion");
m("Hip & Thigh","Adductor magnus","Adductor part: inferior pubic ramus and ischial ramus. Hamstring part: ischial tuberosity.","Linea aspera and gluteal tuberosity; adductor tubercle (hamstring part).","Hip adduction. The hamstring part also extends the hip.","Adductor part: obturator nerve (L2 to L4). Hamstring part: tibial division of sciatic nerve (L4)","Hip: Adduction; ~Hip: Extension");
m("Hip & Thigh","Gracilis","Body and inferior ramus of the pubis.","Proximal medial tibia (pes anserinus).","Hip adduction, knee flexion.","Obturator nerve (L2 to L3)","Hip: Adduction; ~Knee: Flexion");
m("Hip & Thigh","Pectineus","Pectineal line of the pubis.","Pectineal line of the femur.","Hip flexion and adduction.","Femoral nerve (L2 to L3), sometimes also the obturator nerve","Hip: Flexion; Hip: Adduction");
m("Hip & Thigh","Biceps femoris (hamstring)","Long head: ischial tuberosity. Short head: linea aspera and lateral supracondylar line.","Head of the fibula.","Knee flexion, external rotation of a flexed knee. Long head also extends the hip.","Long head: tibial division of sciatic (L5 to S2). Short head: common fibular division of sciatic (L5 to S2)","Knee: Flexion; Hip: Extension");
m("Hip & Thigh","Semitendinosus (hamstring)","Ischial tuberosity.","Proximal medial tibia (pes anserinus).","Hip extension, knee flexion, internal rotation of a flexed knee.","Tibial division of sciatic nerve (L5 to S2)","Knee: Flexion; Hip: Extension");
m("Hip & Thigh","Semimembranosus (hamstring)","Ischial tuberosity.","Posterior surface of the medial tibial condyle.","Hip extension, knee flexion, internal rotation of a flexed knee.","Tibial division of sciatic nerve (L5 to S2)","Knee: Flexion; Hip: Extension");

// ---- Leg and foot
m("Leg & Foot","Popliteus","Lateral surface of the lateral femoral condyle (and the lateral meniscus).","Posterior tibia above the soleal line.","'Unlocks' the extended knee by rotating the femur laterally on the fixed tibia (or the tibia medially when the foot is free). Weak knee flexion.","Tibial nerve (L4 to S1)","~Knee: Flexion");
m("Leg & Foot","Tibialis anterior","Lateral tibial condyle and upper two thirds of the lateral tibia.","Medial cuneiform and base of the 1st metatarsal.","Ankle dorsiflexion, inversion. Weakness gives foot drop.","Deep fibular (peroneal) nerve (L4 to L5)","Ankle: Dorsiflexion; Ankle: Inversion");
m("Leg & Foot","Extensor digitorum longus","Lateral tibial condyle and proximal fibula.","Dorsal surfaces (middle and distal phalanges) of toes 2 to 5.","Extends toes 2 to 5, assists dorsiflexion and eversion.","Deep fibular nerve (L5 to S1)","~Ankle: Dorsiflexion; ~Ankle: Eversion");
m("Leg & Foot","Extensor hallucis longus","Middle anterior fibula and interosseous membrane.","Distal phalanx of the great toe.","Extends the great toe, assists dorsiflexion.","Deep fibular nerve (L5)","~Ankle: Dorsiflexion");
m("Leg & Foot","Fibularis (peroneus) tertius","Distal third of the anterior fibula and interosseous membrane.","Dorsal base of the 5th metatarsal.","Assists dorsiflexion and eversion. Often described as part of extensor digitorum longus.","Deep fibular nerve (L5 to S1)","~Ankle: Dorsiflexion; ~Ankle: Eversion");
m("Leg & Foot","Fibularis (peroneus) longus","Head and proximal lateral fibula.","Medial cuneiform and base of the 1st metatarsal (plantar side, after crossing under the foot).","Ankle eversion, weak plantarflexion. Supports the transverse and lateral arches.","Superficial fibular nerve (L5 to S1)","Ankle: Eversion; ~Ankle: Plantarflexion");
m("Leg & Foot","Fibularis (peroneus) brevis","Distal two thirds of the lateral fibula.","Tuberosity of the 5th metatarsal.","Ankle eversion, weak plantarflexion.","Superficial fibular nerve (L5 to S1)","Ankle: Eversion; ~Ankle: Plantarflexion");
m("Leg & Foot","Gastrocnemius","Posterior surfaces of the medial and lateral femoral condyles.","Calcaneus via the Achilles (calcaneal) tendon.","Ankle plantarflexion (strongest with the knee extended), knee flexion.","Tibial nerve (S1 to S2)","Ankle: Plantarflexion; ~Knee: Flexion");
m("Leg & Foot","Soleus","Soleal line of tibia and proximal posterior fibula.","Calcaneus via the Achilles tendon.","Ankle plantarflexion (postural muscle, works in any knee position because it does not cross the knee).","Tibial nerve (S1 to S2)","Ankle: Plantarflexion");
m("Leg & Foot","Plantaris","Lateral supracondylar line of the femur.","Calcaneus, by a long thin tendon medial to the Achilles tendon.","Weak plantarflexion and knee flexion. Absent in some people; its tendon is used for grafts.","Tibial nerve (S1 to S2)","~Ankle: Plantarflexion; ~Knee: Flexion");
m("Leg & Foot","Tibialis posterior","Interosseous membrane, posterior tibia and fibula.","Navicular tuberosity, cuneiforms, bases of metatarsals 2 to 4.","Ankle inversion, assists plantarflexion, supports the medial longitudinal arch.","Tibial nerve (L4 to L5)","Ankle: Inversion; ~Ankle: Plantarflexion");
m("Leg & Foot","Flexor digitorum longus","Posterior surface of the tibia.","Distal phalanges of toes 2 to 5.","Flexes toes 2 to 5, assists plantarflexion and inversion.","Tibial nerve (S2 to S3; some sources list L5 to S2)","~Ankle: Plantarflexion; ~Ankle: Inversion");
m("Leg & Foot","Flexor hallucis longus","Posterior surface of the fibula.","Distal phalanx of the great toe.","Flexes the great toe (push off in gait), assists plantarflexion.","Tibial nerve (S2 to S3; some sources list L5 to S2)","~Ankle: Plantarflexion");

// ---- Jaw
m("Jaw","Masseter","Zygomatic arch.","Lateral ramus and angle of the mandible.","Elevates the mandible (closes the jaw, chewing).","Mandibular nerve (CN V3)","Jaw: Elevation");
m("Jaw","Temporalis","Temporal fossa.","Coronoid process of the mandible.","Elevates the mandible; posterior fibers retract it.","Mandibular nerve (CN V3)","Jaw: Elevation; Jaw: Retraction");
m("Jaw","Medial pterygoid","Medial surface of the lateral pterygoid plate (and the maxillary tuberosity).","Medial surface of the ramus and angle of the mandible.","Elevates the mandible and helps protrude it. Alternating sides produce the grinding motion of chewing.","Mandibular nerve (CN V3)","Jaw: Elevation; ~Jaw: Protrusion");
m("Jaw","Lateral pterygoid","Upper head: greater wing of sphenoid. Lower head: lateral surface of the lateral pterygoid plate.","Neck of the mandible (pterygoid fovea) and the TMJ disc and capsule.","Protrudes the mandible and opens the jaw (depression). One side alone moves the jaw toward the opposite side.","Mandibular nerve (CN V3)","Jaw: Protrusion; Jaw: Depression");

/* Bones: {r: region, n: bone, intro, L:[[landmark, note], ...]} */
const BONES = [
{r:"Shoulder girdle",n:"Scapula",intro:"Flat triangular bone. Articulates with the clavicle (AC joint) and humerus (glenohumeral joint), and glides on the thorax.",L:[
["Spine of scapula","Posterior ridge dividing the supraspinous and infraspinous fossae. Middle and lower trapezius and posterior deltoid attach."],
["Acromion","Lateral extension of the spine, roof of the shoulder. Articulates with the clavicle. Middle deltoid and trapezius attach."],
["Coracoid process","Anterior hook. Pectoralis minor, short head of biceps, and coracobrachialis attach. Coracoclavicular ligaments."],
["Glenoid fossa","Shallow socket for the humeral head, deepened by the labrum."],
["Supraglenoid tubercle","Above the glenoid. Long head of biceps."],
["Infraglenoid tubercle","Below the glenoid. Long head of triceps."],
["Supraspinous fossa","Supraspinatus origin."],
["Infraspinous fossa","Infraspinatus origin (teres minor from the lateral border)."],
["Subscapular fossa","Anterior surface. Subscapularis origin."],
["Superior angle","Levator scapulae insertion."],
["Medial (vertebral) border","Rhomboids and levator scapulae insert here. Serratus anterior inserts on its anterior surface."],
["Inferior angle","Teres major origin. Landmark for judging scapular upward rotation. Sits at about T7."],
["Lateral border","Teres minor (upper) and teres major (lower) arise near here."],
["Suprascapular notch","Suprascapular nerve passes under the superior transverse scapular ligament."]]},
{r:"Shoulder girdle",n:"Clavicle",intro:"S shaped bone, the only bony link between the upper limb and the axial skeleton.",L:[
["Sternal end","Articulates with the manubrium (SC joint). Sternocleidomastoid and pectoralis major attach nearby."],
["Acromial end","Articulates with the acromion (AC joint). Deltoid and trapezius attach."],
["Conoid tubercle and trapezoid line","Attachments of the coracoclavicular ligaments (stabilize the AC joint)."],
["Subclavian groove","Inferior surface. Subclavius attaches here."]]},
{r:"Arm",n:"Humerus",intro:"Long bone of the arm. Proximal end forms the glenohumeral joint, distal end forms the elbow.",L:[
["Head","Articulates with the glenoid fossa."],
["Anatomical neck","Groove around the head. Joint capsule attaches here."],
["Surgical neck","Common fracture site. Axillary nerve runs close by."],
["Greater tubercle","Rotator cuff insertions: supraspinatus, infraspinatus, teres minor (SIT)."],
["Lesser tubercle","Subscapularis insertion."],
["Intertubercular (bicipital) groove","Holds the long head of biceps tendon. Pectoralis major (lateral lip), latissimus dorsi (floor), teres major (medial lip) insert. 'A lady between two majors.'"],
["Deltoid tuberosity","Deltoid insertion, lateral mid shaft."],
["Radial (spiral) groove","Posterior shaft. Radial nerve and profunda brachii vessels. Mid shaft fractures can injure the radial nerve (wrist drop)."],
["Lateral supracondylar ridge","Brachioradialis and extensor carpi radialis longus origin."],
["Lateral epicondyle","Common extensor tendon origin (wrist and finger extensors, supinator, anconeus). Lateral epicondylitis is 'tennis elbow'."],
["Medial epicondyle","Common flexor tendon origin (wrist and finger flexors, pronator teres). Ulnar nerve passes behind it ('funny bone')."],
["Capitulum","Articulates with the head of the radius."],
["Trochlea","Articulates with the trochlear notch of the ulna."],
["Olecranon fossa","Posterior. Receives the olecranon in full elbow extension."],
["Coronoid and radial fossae","Anterior. Receive the coronoid process and radial head in full elbow flexion."]]},
{r:"Forearm & Hand",n:"Radius",intro:"Lateral forearm bone. Pivots around the ulna in pronation and supination.",L:[
["Head","Disc shaped. Articulates with the capitulum and the radial notch of the ulna. Held by the annular ligament."],
["Radial tuberosity","Biceps brachii insertion."],
["Pronator tuberosity (lateral mid shaft)","Pronator teres insertion."],
["Styloid process","Distal lateral point. Brachioradialis insertion and radial collateral ligament of the wrist."],
["Ulnar notch","Articulates with the head of the ulna (distal radioulnar joint)."],
["Dorsal (Lister's) tubercle","Extensor pollicis longus tendon turns around it."]]},
{r:"Forearm & Hand",n:"Ulna",intro:"Medial forearm bone. Forms the main hinge of the elbow.",L:[
["Olecranon","Point of the elbow. Triceps insertion."],
["Coronoid process","Anterior projection. Brachialis insertion, origin of part of flexor digitorum superficialis and pronator teres."],
["Trochlear notch","Articulates with the humeral trochlea."],
["Radial notch","Articulates with the head of the radius."],
["Ulnar tuberosity","Brachialis insertion."],
["Supinator crest","Supinator origin."],
["Head and styloid process","Distal end (the head of the ulna is distal). Triangular fibrocartilage complex (TFCC) attaches at the styloid."]]},
{r:"Forearm & Hand",n:"Carpal bones",intro:"Eight bones in two rows. Mnemonic, lateral to medial, proximal row first: Some Lovers Try Positions That They Can't Handle.",L:[
["Scaphoid","Proximal row, lateral. Floor of the anatomical snuffbox. Most commonly fractured carpal, with risk of avascular necrosis."],
["Lunate","Proximal row. Most commonly dislocated carpal."],
["Triquetrum","Proximal row, medial."],
["Pisiform","Sesamoid bone in the flexor carpi ulnaris tendon. Abductor digiti minimi origin."],
["Trapezium","Distal row, lateral. Forms the saddle shaped CMC joint with the 1st metacarpal."],
["Trapezoid","Distal row, articulates with the 2nd metacarpal."],
["Capitate","Distal row. Largest carpal bone."],
["Hamate","Distal row, medial. The hook of the hamate is an attachment for the flexor retinaculum and borders the ulnar (Guyon's) canal."],
["Carpal tunnel boundaries","Flexor retinaculum spans scaphoid and trapezium (lateral) to pisiform and hook of hamate (medial). The median nerve and nine flexor tendons (4 FDS, 4 FDP, FPL) pass through."]]},
{r:"Forearm & Hand",n:"Metacarpals and phalanges",intro:"Five metacarpals and 14 phalanges.",L:[
["Metacarpals","Each has a base, shaft, and head. The 1st metacarpal articulates with the trapezium at the saddle joint, allowing opposition."],
["Boxer's fracture","Fracture of the neck of the 5th metacarpal."],
["Phalanges","Proximal, middle, and distal. The thumb has only proximal and distal phalanges (no middle)."],
["Hand arches","Proximal transverse, distal transverse, and longitudinal arches allow cupping and grasp."]]},
{r:"Trunk",n:"Sternum and ribs",intro:"Thoracic cage protecting the heart and lungs.",L:[
["Manubrium","Upper sternum. Articulates with the clavicles and the 1st ribs."],
["Sternal angle","Junction of manubrium and body, at the level of the 2nd rib and T4 to T5."],
["Xiphoid process","Inferior tip. Rectus abdominis and diaphragm attach."],
["True, false, floating ribs","Ribs 1 to 7 are true (attach directly to the sternum), 8 to 10 are false (attach via the cartilage above), 11 to 12 are floating (no anterior attachment)."]]},
{r:"Trunk",n:"Vertebral column",intro:"7 cervical, 12 thoracic, 5 lumbar, sacrum (5 fused), coccyx.",L:[
["C1 (atlas)","No vertebral body. Supports the skull. Nodding 'yes' happens at the atlanto-occipital joint."],
["C2 (axis)","Has the dens (odontoid process). Shaking the head 'no' (rotation) happens at the atlantoaxial joint."],
["C7 (vertebra prominens)","Long, easily palpated spinous process."],
["Thoracic vertebrae","Costal facets for rib articulation. Flexion and extension are limited by the ribs."],
["Lumbar vertebrae","Large bodies for weight bearing. Allow flexion and extension, very little rotation."],
["Sacrum","Five fused vertebrae. Forms the sacroiliac joints with the ilia."],
["Spinous processes","Attachment points for trapezius, rhomboids, latissimus dorsi, and erector spinae."],
["Transverse processes","Attachments for levator scapulae (cervical), scalenes, quadratus lumborum, multifidus."]]},
{r:"Pelvis & Hip",n:"Pelvis (os coxae)",intro:"Ilium, ischium, and pubis fuse at the acetabulum.",L:[
["Iliac crest","Superior border. Abdominal obliques, latissimus dorsi, quadratus lumborum, tensor fasciae latae attach. Highest point is at about L4."],
["ASIS (anterior superior iliac spine)","Sartorius and tensor fasciae latae origin. Inguinal ligament attaches. Palpable landmark."],
["AIIS (anterior inferior iliac spine)","Rectus femoris (straight head) origin. Iliofemoral ligament."],
["PSIS (posterior superior iliac spine)","Under the dimples of the low back, at about S2. Multifidus and sacroiliac ligaments."],
["Iliac fossa","Iliacus origin."],
["Greater sciatic notch","Piriformis and the sciatic nerve pass through the greater sciatic foramen."],
["Ischial tuberosity","The sitting bone. Hamstrings and adductor magnus (hamstring part) origin."],
["Ischial spine","Sacrospinous ligament attaches."],
["Pubic tubercle, crest, and symphysis","The inguinal ligament attaches at the tubercle, rectus abdominis at the crest. The pubic bones join at the symphysis."],
["Superior and inferior pubic rami","Adductor longus, brevis, magnus, gracilis, pectineus origins."],
["Acetabulum","Socket of the hip joint, formed by all three pelvic bones."],
["Obturator foramen","Large opening closed by the obturator membrane. The obturator nerve passes through the obturator canal."]]},
{r:"Pelvis & Hip",n:"Femur",intro:"Longest and strongest bone in the body.",L:[
["Head","Articulates with the acetabulum. The fovea capitis holds the ligamentum teres."],
["Neck","Common site of hip fracture, especially in older adults."],
["Greater trochanter","Gluteus medius and minimus, piriformis, obturator internus, and gemelli insert here."],
["Lesser trochanter","Iliopsoas insertion."],
["Intertrochanteric line and crest","Line (anterior, iliofemoral ligament) and crest (posterior, with quadratus femoris)."],
["Gluteal tuberosity","Gluteus maximus insertion."],
["Linea aspera","Posterior shaft ridge. Adductors, vasti, and short head of biceps femoris attach."],
["Adductor tubercle","Adductor magnus (hamstring part) insertion."],
["Medial and lateral condyles","Articulate with the tibia. Distal femur."],
["Medial and lateral epicondyles","Attachments of the collateral ligaments."],
["Intercondylar fossa","Cruciate ligaments attach (ACL on the lateral wall, PCL on the medial wall)."],
["Patellar surface","Anterior distal femur. The patella glides here."]]},
{r:"Leg & Foot",n:"Patella",intro:"Largest sesamoid bone, embedded in the quadriceps tendon.",L:[
["Base and apex","Base is superior (quadriceps tendon). Apex is inferior (patellar ligament)."],
["Function","Increases the mechanical advantage (moment arm) of the quadriceps at the knee."]]},
{r:"Leg & Foot",n:"Tibia",intro:"Medial, weight bearing bone of the leg.",L:[
["Medial and lateral condyles (tibial plateau)","Articulate with the femoral condyles. The menisci sit on top."],
["Intercondylar eminence","Between the condyles. Cruciate ligaments and menisci attach nearby."],
["Tibial tuberosity","Patellar ligament insertion (quadriceps)."],
["Gerdy's tubercle","Iliotibial tract insertion, lateral proximal tibia."],
["Pes anserinus site","Proximal medial tibia. Sartorius, gracilis, and semitendinosus insert ('Say Grace before Tea')."],
["Anterior border (shin)","Subcutaneous, easily palpated."],
["Soleal line","Soleus origin."],
["Medial malleolus","Medial ankle. Deltoid ligament attaches."]]},
{r:"Leg & Foot",n:"Fibula",intro:"Lateral, non weight bearing bone. Muscle attachment and ankle stability.",L:[
["Head","Biceps femoris insertion and lateral collateral ligament."],
["Neck","The common fibular (peroneal) nerve wraps around it. Vulnerable to injury (foot drop)."],
["Lateral malleolus","Lateral ankle. Anterior talofibular and other lateral ankle ligaments attach."]]},
{r:"Leg & Foot",n:"Tarsals and foot",intro:"Seven tarsals, five metatarsals, 14 phalanges.",L:[
["Calcaneus","Heel bone. Achilles tendon inserts posteriorly. The sustentaculum tali supports the talus."],
["Talus","Articulates with tibia and fibula at the ankle (mortise). No muscle attachments."],
["Navicular","Tibialis posterior inserts at its tuberosity. Keystone of the medial arch."],
["Cuboid","Lateral foot. The fibularis longus tendon passes beneath it."],
["Cuneiforms (medial, intermediate, lateral)","Articulate with the navicular and the first three metatarsals."],
["Metatarsals","Five. The 5th metatarsal tuberosity is the fibularis brevis insertion (site of avulsion fractures)."],
["Foot arches","Medial longitudinal, lateral longitudinal, and transverse arches."]]},
{r:"Head & Neck",n:"Skull and mandible landmarks",intro:"Select landmarks relevant to function, feeding, and neck movement.",L:[
["Mastoid process","Sternocleidomastoid and splenius capitis insertion."],
["External occipital protuberance and nuchal lines","Trapezius and semispinalis capitis attach."],
["Zygomatic arch","Masseter origin."],
["Mandibular angle and ramus","Masseter (lateral) and medial pterygoid (medial) insertion."],
["Coronoid process of mandible","Temporalis insertion."],
["Mandibular condyle","Articulates with the temporal bone (TMJ). Allows opening, closing, protrusion, and lateral excursion."]]}
];

/* Location descriptions (where the structure sits) */
const LOC={
"Trapezius":"Superficial, posterior neck and upper back. The two sides together form a diamond or kite shape.",
"Levator scapulae":"Posterolateral neck, deep to trapezius and sternocleidomastoid.",
"Rhomboids (major and minor)":"Upper back between the scapula and the spine, deep to trapezius.",
"Serratus anterior":"Lateral thoracic wall, passing deep to the scapula. Its digitations show along the ribs.",
"Pectoralis minor":"Anterior upper chest, deep to pectoralis major.",
"Subclavius":"Small muscle beneath the clavicle, anterior upper chest.",
"Pectoralis major":"Superficial, anterior chest wall. Forms the anterior axillary fold.",
"Latissimus dorsi":"Superficial, large sheet over the lower back and lateral trunk. Forms the posterior axillary fold.",
"Deltoid":"Superficial, rounded cap of the shoulder covering the glenohumeral joint.",
"Teres major":"Posterior axilla, inferior to teres minor. Forms part of the posterior axillary fold.",
"Supraspinatus (rotator cuff)":"Posterior shoulder, in the supraspinous fossa, deep to trapezius.",
"Infraspinatus (rotator cuff)":"Posterior scapula, in the infraspinous fossa.",
"Teres minor (rotator cuff)":"Posterior scapula, just inferior to infraspinatus.",
"Subscapularis (rotator cuff)":"Anterior surface of the scapula, between the scapula and the rib cage.",
"Coracobrachialis":"Medial anterior upper arm, deep to the short head of biceps.",
"Biceps brachii":"Superficial, anterior compartment of the arm.",
"Brachialis":"Anterior compartment of the arm, deep to biceps.",
"Triceps brachii":"Posterior compartment of the arm.",
"Anconeus":"Small triangular muscle at the posterior lateral elbow.",
"Brachioradialis":"Superficial, lateral forearm. Forms the lateral border of the cubital fossa.",
"Pronator teres":"Superficial, proximal anterior forearm. Forms the medial border of the cubital fossa.",
"Pronator quadratus":"Deep anterior forearm, distal, just above the wrist.",
"Supinator":"Deep, proximal forearm, wrapping around the lateral radius.",
"Flexor carpi radialis":"Superficial anterior forearm, radial (lateral) side.",
"Palmaris longus":"Superficial anterior forearm, between flexor carpi radialis and flexor carpi ulnaris.",
"Flexor carpi ulnaris":"Superficial anterior forearm, ulnar (medial) side.",
"Flexor digitorum superficialis":"Intermediate layer of the anterior forearm, deep to the superficial flexors.",
"Flexor digitorum profundus":"Deep layer of the anterior forearm, medial side.",
"Flexor pollicis longus":"Deep layer of the anterior forearm, lateral side.",
"Extensor carpi radialis longus":"Superficial posterior forearm, radial side.",
"Extensor carpi radialis brevis":"Superficial posterior forearm, beside extensor carpi radialis longus.",
"Extensor digitorum":"Superficial posterior forearm, central.",
"Extensor digiti minimi":"Superficial posterior forearm, medial to extensor digitorum.",
"Extensor indicis":"Deep posterior forearm, distal half.",
"Extensor carpi ulnaris":"Superficial posterior forearm, ulnar side.",
"Abductor pollicis longus":"Deep layer of the posterior forearm, lateral. Forms the radial border of the anatomical snuffbox with extensor pollicis brevis.",
"Extensor pollicis brevis":"Deep layer of the posterior forearm. Radial border of the anatomical snuffbox, beside abductor pollicis longus.",
"Extensor pollicis longus":"Deep layer of the posterior forearm. Forms the ulnar border of the anatomical snuffbox.",
"Abductor pollicis brevis":"Thenar eminence (base of the thumb), most superficial.",
"Flexor pollicis brevis":"Thenar eminence, medial part.",
"Opponens pollicis":"Thenar eminence, deep to abductor pollicis brevis.",
"Adductor pollicis":"Deep in the thumb web space (first web).",
"Abductor digiti minimi":"Hypothenar eminence, forms the medial border of the palm.",
"Flexor digiti minimi brevis":"Hypothenar eminence.",
"Opponens digiti minimi":"Hypothenar eminence, deep.",
"Lumbricals (4)":"Deep in the palm, arising from the flexor digitorum profundus tendons.",
"Dorsal interossei (4)":"Deep in the spaces between the metacarpals, palpable on the back of the hand.",
"Palmar interossei (3)":"Deep in the palm, between the metacarpals.",
"Sternocleidomastoid":"Superficial anterolateral neck, from the sternum and clavicle up to behind the ear. Divides the anterior and posterior triangles of the neck.",
"Scalenes (anterior, middle, posterior)":"Lateral neck, deep to sternocleidomastoid, in the floor of the posterior triangle.",
"Longus colli and longus capitis (deep neck flexors)":"Deep anterior neck, directly on the front of the cervical vertebrae.",
"Splenius capitis and cervicis":"Posterior neck, deep to trapezius and rhomboids.",
"Semispinalis capitis":"Deep posterior neck, forms the vertical bulge on each side of the midline.",
"Erector spinae (iliocostalis, longissimus, spinalis)":"Posterior trunk, in columns beside the spine. Lateral to medial: iliocostalis, longissimus, spinalis ('I Love Spine').",
"Multifidus":"Deep posterior trunk, in the groove beside the spinous processes.",
"Rectus abdominis":"Anterior abdominal wall, either side of the linea alba, inside the rectus sheath.",
"External oblique":"Superficial layer of the lateral and anterior abdomen. Fibers run down and in ('hands in pockets').",
"Internal oblique":"Middle layer of the lateral abdominal wall, deep to external oblique. Fibers run up and in.",
"Transversus abdominis":"Deepest layer of the abdominal wall, wraps horizontally around the trunk.",
"Quadratus lumborum":"Deep posterior abdominal wall, beside the lumbar spine.",
"Diaphragm":"Dome shaped sheet separating the thoracic and abdominal cavities.",
"Intercostals (external and internal)":"Between adjacent ribs, in two main layers.",
"Iliopsoas":"Deep anterior hip and pelvis. Passes under the inguinal ligament into the anterior thigh.",
"Rectus femoris":"Anterior thigh, superficial and central. The only quadriceps muscle that crosses the hip.",
"Vasti (lateralis, medialis, intermedius)":"Anterior thigh, around the femoral shaft. Lateralis outside, medialis inside, intermedius deep to rectus femoris.",
"Sartorius":"Superficial, crosses the anterior thigh diagonally from lateral to medial. Longest muscle in the body.",
"Tensor fasciae latae":"Anterolateral hip, superficial.",
"Gluteus maximus":"Superficial, posterior hip. Forms the bulk of the buttock.",
"Gluteus medius":"Lateral hip, partly covered by gluteus maximus.",
"Gluteus minimus":"Lateral hip, deepest of the gluteal muscles.",
"Deep lateral rotators (piriformis, obturators, gemelli, quadratus femoris)":"Deep posterior hip, deep to gluteus maximus.",
"Adductor longus":"Medial thigh, superficial adductor. Forms the medial border of the femoral triangle.",
"Adductor brevis":"Medial thigh, deep to adductor longus and pectineus.",
"Adductor magnus":"Medial and posterior thigh. Largest and deepest adductor.",
"Gracilis":"Superficial medial thigh, long thin strap.",
"Pectineus":"Anteromedial upper thigh, floor of the femoral triangle.",
"Biceps femoris (hamstring)":"Posterior thigh, lateral hamstring.",
"Semitendinosus (hamstring)":"Posterior thigh, medial, superficial to semimembranosus.",
"Semimembranosus (hamstring)":"Posterior thigh, medial, deep to semitendinosus.",
"Popliteus":"Deep, behind the knee, in the floor of the popliteal fossa.",
"Tibialis anterior":"Anterior compartment of the leg, just lateral to the shin.",
"Extensor digitorum longus":"Anterior compartment of the leg, lateral part.",
"Extensor hallucis longus":"Anterior compartment of the leg, deep, between tibialis anterior and extensor digitorum longus.",
"Fibularis (peroneus) tertius":"Anterior compartment of the leg, distal lateral part.",
"Fibularis (peroneus) longus":"Lateral compartment of the leg, superficial.",
"Fibularis (peroneus) brevis":"Lateral compartment of the leg, deep to fibularis longus.",
"Gastrocnemius":"Posterior compartment of the leg, superficial. Forms the visible bulk of the calf.",
"Soleus":"Posterior compartment of the leg, deep to gastrocnemius.",
"Plantaris":"Posterior knee and leg, between gastrocnemius and soleus.",
"Tibialis posterior":"Deepest muscle of the posterior compartment of the leg.",
"Flexor digitorum longus":"Posterior compartment of the leg, deep, medial (tibial side).",
"Flexor hallucis longus":"Posterior compartment of the leg, deep, lateral (fibular side).",
"Masseter":"Superficial, lateral face, over the angle of the jaw.",
"Temporalis":"Fan shaped muscle over the temple, lateral skull.",
"Medial pterygoid":"Deep, on the inner side of the mandibular ramus (mirrors masseter).",
"Lateral pterygoid":"Deep, in the infratemporal fossa, running horizontally to the TMJ."
};
MUSCLES.forEach(x=>{x.l=LOC[x.n]||""});
const BLOC={
"Scapula":"Flat bone, posterior thorax over ribs 2 to 7.",
"Clavicle":"Long bone, anterior shoulder, horizontal between the manubrium and the acromion.",
"Humerus":"Long bone of the arm, from shoulder to elbow.",
"Radius":"Long bone, lateral (thumb side) forearm.",
"Ulna":"Long bone, medial (little finger side) forearm.",
"Carpal bones":"Short bones of the wrist, two rows of four.",
"Metacarpals and phalanges":"Long bones of the palm and fingers.",
"Sternum and ribs":"Flat bones of the anterior thorax and thoracic cage.",
"Vertebral column":"Irregular bones, midline of the posterior trunk, from skull to pelvis.",
"Pelvis (os coxae)":"Irregular bone, lower trunk, joined to the sacrum posteriorly and to its partner at the pubic symphysis.",
"Femur":"Long bone of the thigh.",
"Patella":"Sesamoid bone at the anterior knee.",
"Tibia":"Long bone, medial leg (shin).",
"Fibula":"Long bone, lateral leg.",
"Tarsals and foot":"Short bones of the hindfoot and midfoot, long bones of the forefoot.",
"Skull and mandible landmarks":"Flat and irregular bones of the head."
};
BONES.forEach(b=>{b.l=BLOC[b.n]||""});

/* Standard anatomical terminology: [category, term, definition] */
const TERMS=[
["Direction","Anatomical position","Standing upright, feet forward, arms at the sides, palms facing forward. All directional terms assume this position."],
["Direction","Anterior (ventral)","Toward the front of the body."],
["Direction","Posterior (dorsal)","Toward the back of the body."],
["Direction","Superior (cranial)","Toward the head, above."],
["Direction","Inferior (caudal)","Toward the feet, below."],
["Direction","Medial","Toward the midline of the body."],
["Direction","Lateral","Away from the midline of the body."],
["Direction","Proximal","Closer to the trunk or point of attachment of a limb."],
["Direction","Distal","Farther from the trunk or point of attachment of a limb."],
["Direction","Superficial","Closer to the surface of the body."],
["Direction","Deep","Farther from the surface of the body."],
["Direction","Ipsilateral and contralateral","Ipsilateral: same side of the body. Contralateral: opposite side."],
["Direction","Palmar (volar) and dorsal (hand)","Palmar: the front of the hand, palm side. Dorsal: the back of the hand."],
["Direction","Plantar and dorsal (foot)","Plantar: the sole of the foot. Dorsal: the top of the foot."],
["Direction","Radial and ulnar","Radial: thumb side of the forearm and hand. Ulnar: little finger side."],
["Direction","Tibial and fibular","Tibial: medial side of the leg. Fibular: lateral side of the leg."],
["Planes","Sagittal plane","Divides the body into right and left. Flexion and extension happen here, around a medial to lateral (frontal) axis."],
["Planes","Frontal (coronal) plane","Divides the body into front and back. Abduction and adduction happen here, around an anterior to posterior (sagittal) axis."],
["Planes","Transverse (horizontal) plane","Divides the body into upper and lower. Rotation happens here, around a vertical (longitudinal) axis."],
["Movement","Flexion","Decreasing the angle between two bones. Sagittal plane."],
["Movement","Extension","Increasing the angle between two bones. Sagittal plane."],
["Movement","Hyperextension","Extension beyond the anatomical position."],
["Movement","Abduction","Movement away from the midline of the body. Frontal plane. For fingers, away from the middle finger."],
["Movement","Adduction","Movement toward the midline of the body. Frontal plane. For fingers, toward the middle finger."],
["Movement","Internal (medial) rotation","Rotating the anterior surface of a limb toward the midline."],
["Movement","External (lateral) rotation","Rotating the anterior surface of a limb away from the midline."],
["Movement","Horizontal abduction and adduction","Movement of the arm in the transverse plane with the shoulder at 90 degrees. Abduction moves backward, adduction moves forward across the chest."],
["Movement","Circumduction","A circular movement combining flexion, abduction, extension, and adduction."],
["Movement","Supination","Forearm rotation so the palm faces up (anterior). Radius and ulna are parallel."],
["Movement","Pronation","Forearm rotation so the palm faces down (posterior). The radius crosses over the ulna."],
["Movement","Radial deviation","Wrist movement toward the thumb side. Also called radial abduction."],
["Movement","Ulnar deviation","Wrist movement toward the little finger side. Also called ulnar adduction."],
["Movement","Opposition","Thumb pad touching the pad of another finger. A combination of CMC flexion, abduction, and rotation."],
["Movement","Dorsiflexion and plantarflexion","Dorsiflexion: top of the foot toward the shin. Plantarflexion: foot pointing down, away from the shin."],
["Movement","Inversion and eversion","Inversion: sole of the foot turns inward (medially). Eversion: sole turns outward (laterally)."],
["Movement","Protraction and retraction","Protraction: scapula moves forward and away from the spine. Retraction: scapula moves toward the spine."],
["Movement","Elevation and depression","Elevation: moving a structure upward (shrugging the scapula, closing the jaw). Depression: moving it downward."],
["Movement","Upward and downward rotation (scapula)","Upward: the inferior angle swings laterally and the glenoid faces up, needed to raise the arm. Downward: the reverse."],
["Muscle terms","Origin","The attachment that is usually more proximal or stable. It stays fixed while the muscle contracts."],
["Muscle terms","Insertion","The attachment that is usually more distal or mobile. It moves toward the origin when the muscle contracts."],
["Muscle terms","Agonist (prime mover)","The muscle mainly responsible for producing a movement."],
["Muscle terms","Antagonist","The muscle that opposes the agonist. It relaxes or lengthens to allow the movement."],
["Muscle terms","Synergist","A muscle that assists the agonist, or prevents unwanted movement."],
["Muscle terms","Stabilizer (fixator)","A muscle that holds a joint or bone steady so another muscle can act."],
["Muscle terms","Concentric contraction","The muscle shortens while producing force, like lifting a cup."],
["Muscle terms","Eccentric contraction","The muscle lengthens while producing force, like slowly lowering a cup."],
["Muscle terms","Isometric contraction","The muscle produces force without changing length, like holding a cup steady."],
["Muscle terms","Innervation","The nerve supply to a muscle, usually with spinal cord levels (for example C5 to C6)."],
["Muscle terms","Tenodesis","Passive finger flexion when the wrist extends (and finger extension when it flexes), caused by tendon length. Important in spinal cord injury rehab."],
["Muscle terms","Active and passive insufficiency","Active: a two joint muscle cannot generate much force when shortened over both joints at once. Passive: it cannot lengthen enough to allow full motion at both joints at once."],
["Muscle terms","Open and closed kinetic chain","Open chain: the distal segment moves freely (kicking a ball). Closed chain: the distal segment is fixed (a squat), so the proximal segments move."]
];

const JOINT_ORDER=["Scapula","Shoulder","Elbow","Forearm","Wrist","Fingers","Thumb","Neck","Trunk","Hip","Knee","Ankle","Jaw"];

/* Body regions (used to link bones, joints and ligaments) */
const REGIONS={head:"Head & jaw",neck:"Neck",shoulder:"Shoulder",thorax:"Thorax",abdomen:"Abdomen & low back",pelvis:"Hip & pelvis",arm:"Upper arm",elbow:"Elbow",forearm:"Forearm",hand:"Wrist & hand",thigh:"Thigh",knee:"Knee",leg:"Lower leg",foot:"Ankle & foot"};
const BREG={"Scapula":["shoulder","thorax"],"Clavicle":["shoulder"],"Humerus":["arm","shoulder","elbow"],"Radius":["forearm","elbow","hand"],"Ulna":["forearm","elbow"],"Carpal bones":["hand"],"Metacarpals and phalanges":["hand"],"Sternum and ribs":["thorax"],"Vertebral column":["neck","thorax","abdomen"],"Pelvis (os coxae)":["pelvis"],"Femur":["thigh","pelvis","knee"],"Patella":["knee"],"Tibia":["leg","knee","foot"],"Fibula":["leg","knee","foot"],"Tarsals and foot":["foot"],"Skull and mandible landmarks":["head"]};

/* Ligaments: [name, regions, attachments, role] */
const LIG=[
["Coracoclavicular ligaments (conoid and trapezoid)",["shoulder"],"Coracoid process to the conoid tubercle and trapezoid line of the clavicle.","Suspend the scapula from the clavicle and stabilize the AC joint. Torn in higher grade AC separations."],
["Acromioclavicular ligament",["shoulder"],"Acromion to the lateral clavicle.","Reinforces the AC joint capsule and resists horizontal displacement."],
["Coracoacromial ligament",["shoulder"],"Coracoid process to the acromion.","Forms the coracoacromial arch, the roof over the supraspinatus tendon and subacromial space. Site of impingement."],
["Glenohumeral ligaments (superior, middle, inferior)",["shoulder"],"Glenoid and labrum to the anatomical neck and lesser tubercle of the humerus.","Thickenings of the anterior capsule. The inferior glenohumeral ligament is the main anterior stabilizer in abduction with external rotation."],
["Sternoclavicular ligaments",["shoulder","thorax"],"Medial clavicle to the manubrium and first costal cartilage.","Stabilize the SC joint, the only bony attachment of the upper limb to the trunk."],
["Transverse humeral ligament",["shoulder"],"Bridges the greater and lesser tubercles.","Holds the long head of biceps tendon in the intertubercular groove."],
["Ulnar (medial) collateral ligament of the elbow",["elbow"],"Medial epicondyle to the coronoid process and olecranon.","Resists valgus stress. Commonly injured in overhead throwing."],
["Radial (lateral) collateral ligament of the elbow",["elbow"],"Lateral epicondyle to the annular ligament and ulna.","Resists varus stress and stabilizes the radial head."],
["Annular ligament",["elbow","forearm"],"Wraps around the radial head, attached to the radial notch of the ulna.","Holds the radial head against the ulna during pronation and supination. Nursemaid's elbow is a subluxation of the radial head in young children."],
["Interosseous membrane of the forearm",["forearm"],"Between the shafts of the radius and ulna.","Transfers load from the radius to the ulna and gives muscles a broad surface to attach to."],
["Triangular fibrocartilage complex (TFCC)",["hand","forearm"],"Ulnar styloid and ulnar head to the radius, lunate, and triquetrum.","Stabilizes the distal radioulnar joint and cushions the ulnar side of the wrist."],
["Flexor retinaculum (transverse carpal ligament)",["hand"],"Scaphoid and trapezium (lateral) to pisiform and hook of hamate (medial).","Roof of the carpal tunnel. Holds the flexor tendons and median nerve. Median nerve compression here is carpal tunnel syndrome."],
["Radial and ulnar collateral ligaments of the wrist",["hand"],"Radial: radial styloid to scaphoid. Ulnar: ulnar styloid to triquetrum and pisiform.","Resist side to side instability of the wrist."],
["Scapholunate ligament",["hand"],"Between the scaphoid and the lunate.","Key stabilizer of the proximal carpal row. Injury leads to wrist instability."],
["Collateral ligaments of the MCP, PIP, and DIP joints",["hand"],"Sides of each finger joint, from one bone head to the next base.","Resist side to side forces. At the MCP they tighten in flexion, so splints often hold the MCPs flexed to prevent stiffness."],
["Volar (palmar) plates",["hand"],"Thick fibrocartilage on the palmar side of the MCP and IP joints.","Prevent hyperextension of the finger joints."],
["Ulnar collateral ligament of the thumb MCP",["hand"],"Metacarpal head to the base of the proximal phalanx, ulnar side.","Stabilizes the thumb during pinch. Injury is called gamekeeper's or skier's thumb."],
["Iliofemoral ligament (Y ligament)",["pelvis"],"AIIS to the intertrochanteric line.","Strongest ligament in the body. Limits hip extension and helps hold the trunk upright in standing."],
["Pubofemoral ligament",["pelvis"],"Superior pubic ramus to the intertrochanteric line.","Limits excessive abduction and extension."],
["Ischiofemoral ligament",["pelvis"],"Ischium to the greater trochanter region.","Limits internal rotation and extension."],
["Ligamentum teres (of the femoral head)",["pelvis"],"Fovea of the femoral head to the acetabular notch.","Carries a small artery to the femoral head. Minor stabilizer."],
["Sacroiliac, sacrotuberous, and sacrospinous ligaments",["pelvis"],"Sacrum to ilium, ischial tuberosity, and ischial spine.","Stabilize the sacroiliac joint and resist forward tilt of the sacrum. Turn the sciatic notches into foramina."],
["Inguinal ligament",["pelvis","abdomen"],"ASIS to the pubic tubercle.","Lower border of the external oblique aponeurosis. Landmark between the abdomen and the thigh."],
["Anterior cruciate ligament (ACL)",["knee"],"Lateral femoral condyle (posteromedial surface) to the anterior intercondylar area of the tibia.","Prevents anterior translation of the tibia and limits hyperextension and rotation. Commonly torn in pivoting sports."],
["Posterior cruciate ligament (PCL)",["knee"],"Medial femoral condyle (lateral surface) to the posterior intercondylar area of the tibia.","Prevents posterior translation of the tibia."],
["Medial (tibial) collateral ligament (MCL)",["knee"],"Medial femoral epicondyle to the medial tibia.","Resists valgus stress (knee forced inward). Attached to the medial meniscus."],
["Lateral (fibular) collateral ligament (LCL)",["knee"],"Lateral femoral epicondyle to the fibular head.","Resists varus stress (knee forced outward). Not attached to the lateral meniscus."],
["Patellar ligament",["knee"],"Apex of the patella to the tibial tuberosity.","Continuation of the quadriceps tendon. Tapped for the knee jerk reflex (L2 to L4, mainly L4)."],
["Deltoid (medial) ligament of the ankle",["foot"],"Medial malleolus to the talus, navicular, and calcaneus.","Strong. Resists eversion. Injured less often than the lateral ligaments."],
["Lateral ankle ligaments (ATFL, CFL, PTFL)",["foot"],"Lateral malleolus to the talus (ATFL, PTFL) and calcaneus (CFL).","Resist inversion. The anterior talofibular ligament (ATFL) is the most commonly sprained ankle ligament."],
["Tibiofibular syndesmosis",["leg","foot"],"Between the distal tibia and fibula.","Holds the ankle mortise together. High ankle sprains involve this."],
["Spring (plantar calcaneonavicular) ligament and plantar fascia",["foot"],"Calcaneus to navicular (spring ligament). Calcaneus to the metatarsal heads (plantar fascia).","Support the medial longitudinal arch."],
["Anterior longitudinal ligament",["neck","thorax","abdomen"],"Front of the vertebral bodies and discs, skull to sacrum.","Limits spinal extension."],
["Posterior longitudinal ligament",["neck","thorax","abdomen"],"Back of the vertebral bodies, inside the vertebral canal.","Limits flexion and helps contain the disc. Narrower in the lumbar region, where discs commonly herniate posterolaterally."],
["Ligamentum flavum",["neck","thorax","abdomen"],"Between adjacent laminae.","Elastic. Limits flexion and helps return the spine to upright."],
["Supraspinous and interspinous ligaments",["thorax","abdomen"],"Along and between the spinous processes.","Limit spinal flexion."],
["Ligamentum nuchae",["neck"],"External occipital protuberance and crest to the spinous processes of the cervical vertebrae (down to C7).","The neck's supraspinous ligament. Limits neck flexion and gives attachment to trapezius, rhomboid minor, and splenius."],
["Transverse ligament of the atlas",["neck"],"Across the atlas, behind the dens.","Holds the dens against the anterior arch of C1. Rupture threatens the spinal cord."],
["Lateral ligament of the TMJ",["head"],"Zygomatic arch to the neck of the mandible.","Reinforces the TMJ capsule and limits backward displacement."]
];
/* Joints: [name, regions, type, motion, bones] */
const JOINTS=[
["Glenohumeral joint",["shoulder"],"Synovial ball and socket","Flexion, extension, abduction, adduction, internal and external rotation, horizontal abduction and adduction, circumduction. Most mobile joint, least stable.","Head of the humerus, glenoid fossa of the scapula"],
["Acromioclavicular (AC) joint",["shoulder"],"Synovial plane (gliding)","Small gliding and rotation that let the scapula rotate on the clavicle during arm elevation.","Acromion, lateral clavicle"],
["Sternoclavicular (SC) joint",["shoulder","thorax"],"Synovial saddle (functions like a ball and socket)","Clavicular elevation, depression, protraction, retraction, and rotation. Only bony link between the upper limb and the axial skeleton.","Manubrium, medial clavicle, first costal cartilage"],
["Scapulothoracic joint (functional)",["shoulder","thorax"],"Not a true synovial joint. A muscular (physiological) articulation.","Scapular elevation, depression, protraction, retraction, upward and downward rotation. Moves together with the glenohumeral joint in scapulohumeral rhythm (about 2 degrees glenohumeral to 1 degree scapulothoracic).","Scapula gliding on ribs 2 to 7"],
["Elbow (humeroulnar and humeroradial)",["elbow"],"Synovial hinge","Flexion and extension.","Humerus (trochlea, capitulum), ulna (trochlear notch), radial head"],
["Proximal radioulnar joint",["elbow","forearm"],"Synovial pivot","Pronation and supination.","Radial head, radial notch of the ulna, held by the annular ligament"],
["Distal radioulnar joint",["forearm","hand"],"Synovial pivot","Pronation and supination.","Ulnar notch of the radius, head of the ulna, TFCC"],
["Wrist (radiocarpal) joint",["hand"],"Synovial ellipsoid (condyloid)","Flexion, extension, radial and ulnar deviation, circumduction.","Radius and the articular disc (TFCC) with the scaphoid, lunate, and triquetrum"],
["Midcarpal joint",["hand"],"Synovial, combined gliding","Contributes substantially to wrist flexion and extension.","Proximal and distal carpal rows"],
["Thumb carpometacarpal (CMC) joint",["hand"],"Synovial saddle","Flexion, extension, abduction, adduction, and opposition. A common site of osteoarthritis.","Trapezium, base of the first metacarpal"],
["Finger carpometacarpal joints (2 to 5)",["hand"],"Synovial plane (gliding)","Little motion at the 2nd and 3rd. More at the 4th and 5th, which allows cupping of the palm.","Distal carpals, bases of metacarpals 2 to 5"],
["Metacarpophalangeal (MCP) joints",["hand"],"Synovial ellipsoid (condyloid)","Flexion, extension, abduction, and adduction of the fingers.","Metacarpal heads, bases of the proximal phalanges"],
["Interphalangeal joints (PIP, DIP, thumb IP)",["hand"],"Synovial hinge","Flexion and extension only.","Adjacent phalanges"],
["Hip joint",["pelvis"],"Synovial ball and socket","Flexion, extension, abduction, adduction, internal and external rotation. The deep socket makes it very stable.","Femoral head, acetabulum"],
["Sacroiliac joint",["pelvis"],"Synovial plane joint (anterior) with a fibrous part behind, bound by very strong ligaments","Very small movement (nutation and counternutation). Transfers load between the trunk and the legs.","Sacrum, ilium"],
["Pubic symphysis",["pelvis"],"Cartilaginous (secondary, fibrocartilage disc)","Minimal movement. Widens slightly during childbirth.","Left and right pubic bones"],
["Knee (tibiofemoral) joint",["knee"],"Synovial modified hinge (bicondylar)","Flexion and extension with slight rotation. In terminal extension the tibia externally rotates (screw home mechanism). Menisci deepen the tibial surface.","Femoral condyles, tibial plateau"],
["Patellofemoral joint",["knee"],"Synovial plane (gliding)","The patella glides superiorly and inferiorly, improving quadriceps leverage.","Patella, patellar surface of the femur"],
["Proximal tibiofibular joint",["knee","leg"],"Synovial plane","Minimal movement. Accommodates ankle motion.","Fibular head, lateral tibial condyle"],
["Ankle (talocrural) joint",["foot"],"Synovial hinge","Dorsiflexion and plantarflexion.","Tibia and fibula (the mortise), talus"],
["Subtalar joint",["foot"],"Synovial plane (gliding)","Inversion and eversion.","Talus, calcaneus"],
["Transverse tarsal (midtarsal) joint",["foot"],"Synovial (talonavicular and calcaneocuboid joints together)","Adds to inversion and eversion and lets the foot adapt to uneven ground.","Talus and calcaneus to navicular and cuboid"],
["Metatarsophalangeal and interphalangeal joints (toes)",["foot"],"MTP: synovial ellipsoid. IP: synovial hinge","MTP: flexion, extension, abduction, adduction. IP: flexion and extension.","Metatarsal heads, phalanges"],
["Temporomandibular joint (TMJ)",["head"],"Synovial, modified hinge and gliding, with an articular disc","Mouth opening and closing, protrusion, retrusion, lateral excursion.","Mandibular condyle, mandibular fossa of the temporal bone"],
["Atlanto-occipital joint",["neck"],"Synovial condyloid","Nodding of the head (flexion and extension, the 'yes' motion).","Occipital condyles, atlas (C1)"],
["Atlantoaxial joint",["neck"],"Synovial pivot","Head rotation (the 'no' motion), about half of cervical rotation.","Atlas (C1), dens of the axis (C2)"],
["Intervertebral and facet (zygapophyseal) joints",["neck","thorax","abdomen"],"Cartilaginous (disc) and synovial plane (facets)","Flexion, extension, lateral flexion, rotation. Available motion depends on facet orientation. Cervical allows all, thoracic favors rotation (flexion and extension limited by the ribs), lumbar favors flexion and extension with little rotation.","Adjacent vertebrae and the intervertebral disc"],
["Costovertebral and costotransverse joints",["thorax"],"Synovial plane","Rib elevation and depression during breathing (pump handle and bucket handle movements).","Rib heads and tubercles, vertebral bodies and transverse processes"]
];
const SEXNOTE={pelvis:"Female and male pelvis: the female pelvis is typically wider and shallower with a wider subpubic angle; the male pelvis is typically narrower and deeper. Both vary between individuals.",knee:"Q angle (quadriceps angle) is typically larger in females, partly because of the wider pelvis. A larger Q angle is linked to patellofemoral tracking problems."};

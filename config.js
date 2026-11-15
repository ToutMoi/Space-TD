// PROTOTYPE - NOT FOR PRODUCTION
// Question: Est-ce que donner des ordres pendant la bataille rend Rempart plus prenant qu'un combat qu'on regarde ?
// Date: 2026-11-14
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
// Starting values are Rempart's (space-game-play), read from its published build.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- Economy (Rempart) ----
  start_metal: { value: 5000, min: 0, max: 100000, step: 500 },
  start_crystal: { value: 2500, min: 0, max: 100000, step: 500 },
  start_hydrogen: { value: 500, min: 0, max: 50000, step: 100 },
  base_metal_per_hour: { value: 30, min: 0, max: 500, step: 5 },     // free production, no mine
  base_crystal_per_hour: { value: 15, min: 0, max: 500, step: 5 },
  base_hydrogen_per_hour: { value: 6, min: 0, max: 200, step: 1 },   // new: a trickle so orders are never locked out
  fleet_dist: { value: 2.7, min: 2, max: 6, step: 0.05 },           // where the enemy fleet stops, in planet radii
  hours_per_wave: { value: 15, min: 1, max: 60, step: 1 },           // production paid each wave = hourly x this
  level_growth: { value: 1.1, min: 1, max: 1.5, step: 0.01 },        // production = perLevel x level x growth^level
  countdown: { value: 60, min: 10, max: 180, step: 5 },              // s before the fleet comes by itself
  early_bonus: { value: 0.25, min: 0, max: 1, step: 0.05 },          // share of a wave's production for launching at once
  energy_tech_bonus: { value: 0.1, min: 0, max: 0.5, step: 0.01 },   // energy +10% a level

  // ---- Battle (Rempart) ----
  rounds: { value: 6, min: 1, max: 12, step: 1 },
  lives: { value: 3, min: 1, max: 10, step: 1 },
  debris_share: { value: 0.15, min: 0, max: 0.5, step: 0.01 },       // of destroyed enemy metal+crystal (Rempart: 0.12)
  rebuild_chance: { value: 0.7, min: 0, max: 1, step: 0.05 },        // lost defences that come back
  robotics_rebuild: { value: 0.05, min: 0, max: 0.2, step: 0.01 },   // + a robotics level
  plunder_share: { value: 0.3, min: 0, max: 1, step: 0.05 },         // resources taken on a defeat (Rempart: 0.5)
  respite: { value: 0.2, min: 0, max: 0.9, step: 0.05 },             // after a defeat, the next fleet is this much weaker
  draw_plunder_share: { value: 0.2, min: 0, max: 1, step: 0.05 },    // on a draw (both sides left after the last round)
  research_bonus: { value: 0.1, min: 0, max: 0.5, step: 0.01 },      // weapons / shielding / armour +10% a level
  explode_threshold: { value: 0.7, min: 0, max: 1, step: 0.05 },     // a hull under this share may explode

  // ---- Waves (Rempart) ----
  wave_value: { value: 12000, min: 1000, max: 100000, step: 1000 },  // resource value of wave 1
  wave_growth_early: { value: 1.35, min: 1, max: 2, step: 0.01 },    // x per wave until wave_growth_switch
  wave_growth_late: { value: 1.17, min: 1, max: 2, step: 0.01 },      // x per wave after the switch (Rempart: 1.25)
  wave_growth_switch: { value: 8, min: 1, max: 30, step: 1 },
  boss_every: { value: 5, min: 2, max: 20, step: 1 },
  boss_value_mult: { value: 1.0, min: 0.2, max: 4, step: 0.1 },     // escort fleet of a boss wave, x a normal wave's value
  boss_top_share: { value: 0, min: 0, max: 1, step: 0.01 },          // Rempart's old boss rule (a third in its top ship); 0 now that bosses are unique
  enemy_stat_step: { value: 0.06, min: 0, max: 0.5, step: 0.01 },    // enemy stats + this every 3 waves (Rempart: 0.1)

  // ---- Unique bosses (new): one every boss_every waves, in turn ----
  boss_scale_exp: { value: 0.75, min: 0.3, max: 1.5, step: 0.05 },   // boss stats x (wave value / wave-5 value)^this (was 0.85: the wave-25 boss was near unbeatable)
  final_boss_scale: { value: 6, min: 1, max: 30, step: 0.5 },        // the Dévoreur's own stat multiplier on the final wave (it was x29 with the shared curve: unkillable)
  adapt_from: { value: 10, min: 1, max: 100, step: 1 },              // Adaptation: from this wave the fleet gets rapid fire against your main defence
  adapt_rapid: { value: 3, min: 1, max: 20, step: 1 },               // Adaptation: the rapid fire it gets (1 = off)
  boss_alive_loses: { value: 1, min: 0, max: 1, step: 1 },           // 1: a boss still flying after the last round costs a life
  carrier_spawn: { value: 3, min: 0, max: 20, step: 1 },             // Ruche: ships launched each round
  carrier_spawn_growth: { value: 1, min: 0, max: 10, step: 1 },      // + this per boss cycle
  aegis_mult: { value: 3, min: 1, max: 10, step: 0.5 },              // Égide: escort shields x this while it flies
  mines_share: { value: 0.04, min: 0, max: 0.3, step: 0.01 },        // Semeur: share of defences mined each round
  mines_min: { value: 2, min: 0, max: 50, step: 1 },                 // Semeur: at least this many

  // ---- The end and Ascension (new) ----
  final_wave: { value: 30, min: 5, max: 100, step: 1 },              // beat the Dévoreur on this wave to win the run
  asc_points_bonus: { value: 0.25, min: 0, max: 2, step: 0.05 },     // specialisation points x(1 + this x level)
  asc_shards_base: { value: 1, min: 0, max: 10, step: 1 },           // shards for a win: this + the Ascension level
  asc_enemy: { value: 0.1, min: 0, max: 1, step: 0.05 },             // A1 and A8: enemy stats + this each
  asc_order_cost: { value: 0.25, min: 0, max: 2, step: 0.05 },       // A3: orders cost x(1 + this)
  asc_wave: { value: 0.1, min: 0, max: 1, step: 0.05 },              // A4: fleets x(1 + this)
  asc_boss: { value: 0.25, min: 0, max: 2, step: 0.05 },             // A5: bosses x(1 + this)
  asc_debris: { value: 0.25, min: 0, max: 1, step: 0.05 },           // A6: debris x(1 - this)
  asc_countdown: { value: 0.67, min: 0.2, max: 1, step: 0.01 },      // A7: countdown x this
  asc_rebuild: { value: 0.15, min: 0, max: 0.7, step: 0.05 },        // A9: rebuild chance - this
  asc_final_extra: { value: 5, min: 0, max: 30, step: 1 },           // A10: the final wave comes this much later
  asc_hydro: { value: 10, min: 0, max: 100, step: 1 },               // Réserves: base hydrogen/hour + a rank
  asc_yard: { value: 3, min: 0, max: 20, step: 1 },                  // Chantiers: light lasers at start, a rank
  asc_boss_hunt: { value: 0.25, min: 0, max: 2, step: 0.05 },        // Chasseur de boss: damage to bosses + a rank
  asc_doctrine: { value: 0.1, min: 0, max: 0.5, step: 0.01 },        // Doctrine ultime: every defence stat + a rank

  // ---- Orders (new) : paid in hydrogen, one per round ----
  order_overcharge_cost: { value: 100, min: 0, max: 5000, step: 10 },
  order_overcharge_mult: { value: 1.5, min: 1, max: 4, step: 0.1 },   // defence attack this round
  order_shield_cost: { value: 100, min: 0, max: 5000, step: 10 },
  order_shield_mult: { value: 2, min: 1, max: 5, step: 0.1 },         // defence shields this round
  order_focus_cost: { value: 60, min: 0, max: 5000, step: 10 },       // every defence fires at one ship class
  order_cost_growth: { value: 0.08, min: 0, max: 0.5, step: 0.01 },   // order costs + this a wave
  order_time: { value: 7, min: 1, max: 30, step: 0.5 },               // s to pick an order before the round fires
  round_anim_time: { value: 2.6, min: 0.5, max: 8, step: 0.1 },       // s a round plays on screen

  // ---- Simulator (new) ----
  sim_runs: { value: 24, min: 4, max: 100, step: 1 },

  // ---- Camera ----
  cam_build_dist: { value: 5.2, min: 2.5, max: 10, step: 0.1 },
  cam_battle_dist: { value: 7, min: 2.5, max: 12, step: 0.1 },
  ring_spin: { value: 0.05, min: 0, max: 1, step: 0.01 },             // rad/s of the defence ring

  // ---- Look (new) ----
  bloom_strength: { value: 0.5, min: 0, max: 3, step: 0.05 },
  bloom_radius: { value: 0.55, min: 0, max: 1, step: 0.05 },
  bloom_threshold: { value: 0.95, min: 0, max: 1.5, step: 0.01 },
  shake: { value: 1, min: 0, max: 3, step: 0.1 },                     // camera shake on big explosions
  glow_intensity: { value: 1.4, min: 0.5, max: 5, step: 0.1 },        // engines, barrels, cores (was 2.2)
  overcharge_glow: { value: 1.5, min: 1, max: 4, step: 0.1 },        // x on defence glow during Surcharge
  shot_brightness: { value: 2.5, min: 0.5, max: 6, step: 0.1 },      // beams and orbs (was 4)
  flash_strength: { value: 0.55, min: 0, max: 1.5, step: 0.05 },     // size of explosion and impact flashes (was 1)

  // ---- Specialisation tree (new): points earned every run, kept between runs ----
  meta_pts_waves: { value: 2, min: 1, max: 10, step: 1 },            // 1 point every this many waves held (was 1+ a point every wave: the tree filled in 2 runs)
  meta_pts_boss: { value: 3, min: 0, max: 20, step: 1 },             // points for a boss downed
  meta_pts_win: { value: 7, min: 0, max: 50, step: 1 },              // points for downing the Dévoreur
  meta_refund_div: { value: 3.2, min: 1, max: 10, step: 0.1 },       // old saves: points earned / this, given back once
  tree_gate_2: { value: 3, min: 0, max: 100, step: 1 },              // points spent in a branch to open its tier 2
  tree_gate_3: { value: 10, min: 0, max: 100, step: 1 },
  tree_gate_4: { value: 20, min: 0, max: 100, step: 1 },
  tree_gate_5: { value: 35, min: 0, max: 200, step: 1 },             // the keystones
  ks_prod: { value: 0.25, min: 0, max: 1, step: 0.05 },              // Économie de guerre
  ks_debris: { value: 0.1, min: 0, max: 0.5, step: 0.01 },           // Ferrailleurs
  ks_wall: { value: 0.2, min: 0, max: 1, step: 0.05 },               // Muraille
  ks_guns: { value: 0.2, min: 0, max: 1, step: 0.05 },               // Batteries lourdes
  ks_supply_rounds: { value: 2, min: 0, max: 6, step: 1 },           // Intendance: free orders in these first rounds
  meta_flag: { value: 0.15, min: 0, max: 1, step: 0.05 },            // Équipage: flagship stats + a rank
  meta_aura: { value: 0.03, min: 0, max: 0.2, step: 0.01 },          // Rayonnement: aura + a rank
  meta_vet_start: { value: 3, min: 0, max: 20, step: 1 },            // Instruction: veterancy at the start, a rank
  meta_lance_pct: { value: 0.03, min: 0, max: 0.2, step: 0.01 },     // Lance affûtée: + share of the target's structure, a rank
  meta_salvo: { value: 1, min: 0, max: 5, step: 1 },                 // Salves: shots a round, a rank
  meta_prod: { value: 0.05, min: 0, max: 0.5, step: 0.01 },          // Prospection: production + a rank
  meta_start_metal: { value: 1500, min: 0, max: 20000, step: 100 },  // Capital de départ, a rank
  meta_start_crystal: { value: 750, min: 0, max: 20000, step: 50 },
  meta_start_hydrogen: { value: 200, min: 0, max: 5000, step: 50 },
  meta_hydro: { value: 4, min: 0, max: 50, step: 1 },                // Synthèse: base hydrogen/hour + a rank
  meta_debris: { value: 0.02, min: 0, max: 0.2, step: 0.01 },        // Recyclage: debris share + a rank
  meta_scout: { value: 0.1, min: 0, max: 1, step: 0.05 },            // Éclaireurs: early bonus x(1 + this) a rank
  meta_vault: { value: 0.1, min: 0, max: 0.3, step: 0.01 },          // Coffres blindés: plunder - a rank
  meta_start_rockets: { value: 3, min: 0, max: 20, step: 1 },        // Fortifications: rocket launchers at start, a rank
  meta_hull: { value: 0.05, min: 0, max: 0.3, step: 0.01 },          // Blindage hérité
  meta_shield: { value: 0.05, min: 0, max: 0.3, step: 0.01 },        // Boucliers hérités
  meta_attack: { value: 0.05, min: 0, max: 0.3, step: 0.01 },        // Artillerie
  meta_rebuild: { value: 0.04, min: 0, max: 0.2, step: 0.01 },       // Ingénierie orbitale
  meta_cost: { value: 0.1, min: 0, max: 0.3, step: 0.01 },           // Logistique: order costs - a rank
  meta_over: { value: 0.15, min: 0, max: 1, step: 0.05 },            // Surcharge améliorée: + to the multiplier
  meta_shieldorder: { value: 0.25, min: 0, max: 2, step: 0.05 },     // Bouclier renforcé: + to the multiplier
  meta_focus: { value: 0.1, min: 0, max: 0.5, step: 0.05 },          // Tir de précision: focus also adds attack

  // ---- Flagship (new): your own ship, fights beside the defences, comes back repaired ----
  flag_attack: { value: 300, min: 10, max: 5000, step: 10 },
  flag_shield: { value: 200, min: 0, max: 5000, step: 10 },
  flag_hull: { value: 4000, min: 100, max: 50000, step: 100 },
  flag_growth: { value: 1.3, min: 1.05, max: 2, step: 0.05 },        // stats x this per level of Armement / Coque
  flag_cost_metal: { value: 3000, min: 0, max: 100000, step: 100 },  // first level of each upgrade
  flag_cost_crystal: { value: 2000, min: 0, max: 100000, step: 100 },
  flag_cost_hydrogen: { value: 500, min: 0, max: 50000, step: 50 },
  flag_cost_factor: { value: 1.6, min: 1.1, max: 3, step: 0.05 },    // each level costs x this
  flag_shots: { value: 3, min: 1, max: 10, step: 1 },                // shots a round, + 1 every 2 Armement levels
  flag_vet: { value: 0.08, min: 0, max: 0.5, step: 0.01 },           // Vétérance: stats + this per battle it survives in the run
  flag_aura: { value: 0.1, min: 0, max: 1, step: 0.01 },             // Commandement: every defence's attack + this while it flies
  flag_aura_per_level: { value: 0.05, min: 0, max: 0.5, step: 0.01 }, // + this per Pont de commandement level
  lance_pct: { value: 0.1, min: 0, max: 1, step: 0.01 },             // Lance: also takes this share of the target's full structure
  lance_pct_per_level: { value: 0.02, min: 0, max: 0.2, step: 0.01 }, // + per Lance level
  lance_mult: { value: 4, min: 0, max: 50, step: 0.5 },              // Lance: one shot of attack x this, through shields, once a battle
  lance_per_level: { value: 1, min: 0, max: 10, step: 0.25 },        // + this to the multiplier per Lance level

  // ---- Boss loot (new): a downed boss offers artefacts, kept for the run ----
  artifact_slots: { value: 3, min: 1, max: 8, step: 1 },
  artifact_choices: { value: 3, min: 1, max: 6, step: 1 },
};

// ---- Rempart's tables (costs in metal / crystal / hydrogen) ----
window.DATA = {
  buildings: {
    metalMine:     { name: 'Mine de métal', desc: 'Produit le métal, la ressource de base.', cost: [60, 15, 0], factor: 1.5, produces: 'metal', perLevel: 30, energyUse: 10 },
    crystalMine:   { name: 'Mine de cristal', desc: 'Produit le cristal, pour l’électronique et les lasers.', cost: [48, 24, 0], factor: 1.6, produces: 'crystal', perLevel: 20, energyUse: 10 },
    hydrogenSynth: { name: 'Synthétiseur d’hydrogène', desc: 'Produit l’hydrogène des armes lourdes et des ordres.', cost: [225, 75, 0], factor: 1.5, produces: 'hydrogen', perLevel: 10, energyUse: 20 },
    solarPlant:    { name: 'Centrale solaire', desc: 'Fournit l’énergie des mines. Sans énergie, la production baisse.', cost: [75, 30, 0], factor: 1.5, produces: 'energy', perLevel: 20 },
  },
  defenses: {
    rocketLauncher: { name: 'Lance-missiles', cost: [2000, 0, 0], attack: 80, shield: 20, hull: 200, color: 0xb0b6c0 },
    lightLaser:     { name: 'Laser léger', cost: [1500, 500, 0], attack: 100, shield: 25, hull: 200, color: 0x5cc8ff },
    heavyLaser:     { name: 'Laser lourd', cost: [6000, 2000, 0], attack: 250, shield: 100, hull: 800, color: 0x2f7bff, needs: { weapons: 1 } },
    ionCannon:      { name: 'Canon ionique', cost: [5000, 3000, 0], attack: 150, shield: 500, hull: 800, color: 0x9b6bff, needs: { shielding: 2 } },
    gaussCannon:    { name: 'Canon de Gauss', cost: [20000, 15000, 2000], attack: 1100, shield: 200, hull: 3500, color: 0xffc14d, needs: { weapons: 3, energyTech: 2 }, rapidFire: { cruiser: 2 } },
    plasmaTurret:   { name: 'Tourelle à plasma', cost: [50000, 50000, 30000], attack: 3000, shield: 300, hull: 10000, color: 0xff5a3c, needs: { weapons: 6, energyTech: 5 }, rapidFire: { battleship: 2 } },
    smallShield:    { name: 'Petit bouclier', cost: [10000, 10000, 0], attack: 1, shield: 2000, hull: 2000, color: 0x5fffd0, max: 1, needs: { shielding: 1 }, dome: true },
    largeShield:    { name: 'Grand bouclier', cost: [50000, 50000, 0], attack: 1, shield: 10000, hull: 10000, color: 0x6fa8ff, max: 1, needs: { shielding: 5 }, dome: true },
  },
  ships: {
    raider:     { name: 'Pillard', cost: [3000, 1000, 0], attack: 50, shield: 10, hull: 400, from: 1 },
    fighter:    { name: 'Chasseur lourd', cost: [6000, 4000, 0], attack: 150, shield: 25, hull: 1000, from: 3 },
    cruiser:    { name: 'Croiseur', cost: [20000, 7000, 2000], attack: 400, shield: 50, hull: 2700, from: 5, rapidFire: { rocketLauncher: 10 } },
    battleship: { name: 'Cuirassé', cost: [45000, 15000, 0], attack: 1000, shield: 200, hull: 6000, from: 8 },
    bomber:     { name: 'Bombardier', cost: [50000, 25000, 15000], attack: 1000, shield: 500, hull: 7500, from: 11, rapidFire: { rocketLauncher: 20, lightLaser: 20, heavyLaser: 10, ionCannon: 10 } },
    destroyer:  { name: 'Destructeur', cost: [60000, 50000, 15000], attack: 2000, shield: 500, hull: 11000, from: 14, rapidFire: { lightLaser: 2 } },
  },
  // Unique bosses, in turn every boss_every waves. Stats are at wave 5 and grow with the waves.
  // They are tanky against scattered fire: Tir concentré is how you bring one down.
  bosses: {
    carrier:   { name: 'Ruche', title: 'Porte-nefs', cost: [60000, 30000, 0], attack: 300, shield: 600, hull: 9000,
                 mech: 'Lance de nouveaux vaisseaux à chaque round. Abats-la vite ou l’essaim te submerge.' },
    jammer:    { name: 'Silence', title: 'Brouilleur', cost: [50000, 40000, 0], attack: 700, shield: 800, hull: 8000,
                 mech: 'Brouille un de tes ordres à chaque round : il est inutilisable tant qu’elle vole.' },
    aegis:     { name: 'Égide', title: 'Forteresse-bouclier', cost: [70000, 50000, 0], attack: 450, shield: 1500, hull: 11000,
                 mech: 'Triple les boucliers de son escorte tant qu’elle vole. Concentre le tir sur elle d’abord.' },
    minelayer: { name: 'Semeur', title: 'Poseur de mines', cost: [55000, 35000, 0], attack: 350, shield: 700, hull: 9000,
                 mech: 'Pose des mines qui détruisent une partie de tes défenses avant chaque round.' },
    devourer:  { name: 'Dévoreur', title: 'Boss final', final: true, cost: [400000, 300000, 100000], attack: 1000, shield: 1500, hull: 22000,
                 mech: 'Le boss final. Il lance des vaisseaux, brouille un ordre, protège son escorte et pose des mines, tout à la fois. Abats-le pour gagner la partie.' },
  },
  research: {
    weapons:    { name: 'Armement', desc: '+10 % d’attaque par niveau', cost: [800, 200, 0], factor: 2 },
    shielding:  { name: 'Boucliers', desc: '+10 % de bouclier par niveau', cost: [200, 600, 0], factor: 2 },
    armour:     { name: 'Blindage', desc: '+10 % de structure par niveau', cost: [1000, 0, 0], factor: 2 },
    energyTech: { name: 'Énergie', desc: '+10 % d’énergie par niveau, débloque les armes lourdes', cost: [0, 800, 400], factor: 2 },
    robotics:   { name: 'Robotique', desc: '+5 % de défenses reconstruites par niveau', cost: [400, 1200, 200], factor: 2, max: 5 },
  },
  // The specialisation tree: three branches, four tiers. A node opens when a node of the tier
  // above in its branch has a rank. cost = points for each rank. {v} in desc is the per-rank value.
  // Each rank costs cost x its number (rank 3 = 3 x cost). A tier opens once the branch has
  // tree_gate_<tier> points spent in it. Tier 5 holds two keystones: only one per branch.
  tree: [
    { id: 'eco_prod', branch: 'eco', tier: 1, name: 'Prospection', icon: 'metal', max: 5, cost: 1, desc: 'Production des mines +{p} par rang', key: 'meta_prod', pct: true },
    { id: 'eco_start', branch: 'eco', tier: 2, name: 'Capital de départ', icon: 'crystal', max: 3, cost: 2, desc: '+{start} au départ par rang' },
    { id: 'eco_hydro', branch: 'eco', tier: 2, name: 'Synthèse', icon: 'hydrogen', max: 3, cost: 2, desc: 'Hydrogène de base +{v}/h par rang', key: 'meta_hydro' },
    { id: 'eco_debris', branch: 'eco', tier: 3, name: 'Recyclage', icon: 'debris', max: 3, cost: 3, desc: 'Débris récupérés +{p} par rang', key: 'meta_debris', pct: true },
    { id: 'eco_scout', branch: 'eco', tier: 3, name: 'Éclaireurs', icon: 'scout', max: 3, cost: 3, desc: 'Bonus d’appel anticipé +{p} par rang', key: 'meta_scout', pct: true },
    { id: 'eco_vault', branch: 'eco', tier: 4, name: 'Coffres blindés', icon: 'vault', max: 3, cost: 4, desc: 'Pillage réduit de {p} par rang', key: 'meta_vault', pct: true },
    { id: 'ks_eco_war', branch: 'eco', tier: 5, group: 'eco', name: 'Économie de guerre', icon: 'metal', max: 1, cost: 8, desc: 'Production des mines +{p}', key: 'ks_prod', pct: true },
    { id: 'ks_eco_scrap', branch: 'eco', tier: 5, group: 'eco', name: 'Ferrailleurs', icon: 'debris', max: 1, cost: 8, desc: 'Débris récupérés +{p}', key: 'ks_debris', pct: true },
    { id: 'def_start', branch: 'def', tier: 1, name: 'Fortifications', icon: 'tower', max: 3, cost: 1, desc: '+{v} lance-missiles au départ par rang', key: 'meta_start_rockets' },
    { id: 'def_hull', branch: 'def', tier: 2, name: 'Blindage hérité', icon: 'hull', max: 5, cost: 2, desc: 'Structure des défenses +{p} par rang', key: 'meta_hull', pct: true },
    { id: 'def_shield', branch: 'def', tier: 2, name: 'Boucliers hérités', icon: 'shield', max: 5, cost: 2, desc: 'Boucliers des défenses +{p} par rang', key: 'meta_shield', pct: true },
    { id: 'def_rebuild', branch: 'def', tier: 3, name: 'Ingénierie orbitale', icon: 'gear', max: 3, cost: 3, desc: 'Reconstruction +{p} par rang', key: 'meta_rebuild', pct: true },
    { id: 'def_attack', branch: 'def', tier: 3, name: 'Artillerie', icon: 'attack', max: 5, cost: 3, desc: 'Attaque des défenses +{p} par rang', key: 'meta_attack', pct: true },
    { id: 'def_life', branch: 'def', tier: 4, name: 'Bastion', icon: 'heart', max: 2, cost: 5, desc: '+1 vie par rang' },
    { id: 'ks_def_wall', branch: 'def', tier: 5, group: 'def', name: 'Muraille', icon: 'shield', max: 1, cost: 8, desc: 'Boucliers et structure des défenses +{p}', key: 'ks_wall', pct: true },
    { id: 'ks_def_guns', branch: 'def', tier: 5, group: 'def', name: 'Batteries lourdes', icon: 'attack', max: 1, cost: 8, desc: 'Attaque des défenses +{p}', key: 'ks_guns', pct: true },
    { id: 'cmd_cost', branch: 'cmd', tier: 1, name: 'Logistique', icon: 'hydrogen', max: 3, cost: 1, desc: 'Ordres {p} moins chers par rang', key: 'meta_cost', pct: true },
    { id: 'cmd_over', branch: 'cmd', tier: 2, name: 'Surcharge améliorée', icon: 'over', max: 3, cost: 2, desc: 'Surcharge +{v} par rang', key: 'meta_over', mult: true },
    { id: 'cmd_shield', branch: 'cmd', tier: 2, name: 'Bouclier renforcé', icon: 'shield', max: 2, cost: 2, desc: 'Bouclier d’urgence +{v} par rang', key: 'meta_shieldorder', mult: true },
    { id: 'cmd_focus', branch: 'cmd', tier: 3, name: 'Tir de précision', icon: 'focus', max: 3, cost: 3, desc: 'Tir concentré : attaque +{p} par rang', key: 'meta_focus', pct: true },
    { id: 'cmd_free', branch: 'cmd', tier: 4, name: 'Ordre d’ouverture', icon: 'over', max: 1, cost: 4, desc: 'Le premier ordre de chaque bataille est gratuit' },
    { id: 'cmd_round', branch: 'cmd', tier: 5, group: 'cmd', name: 'Commandant vétéran', icon: 'star', max: 1, cost: 8, desc: 'Les batailles durent un round de plus' },
    { id: 'ks_cmd_supply', branch: 'cmd', tier: 5, group: 'cmd', name: 'Intendance', icon: 'hydrogen', max: 1, cost: 8, desc: 'Ordres gratuits pendant les {v} premiers rounds', key: 'ks_supply_rounds' },
    { id: 'adm_crew', branch: 'adm', tier: 1, name: 'Équipage d’élite', icon: 'flag', max: 3, cost: 1, desc: 'Attaque, boucliers et structure de l’amiral +{p} par rang', key: 'meta_flag', pct: true },
    { id: 'adm_aura', branch: 'adm', tier: 2, name: 'Rayonnement', icon: 'focus', max: 3, cost: 2, desc: 'Aura de commandement +{p} par rang', key: 'meta_aura', pct: true },
    { id: 'adm_vet', branch: 'adm', tier: 2, name: 'Instruction', icon: 'star', max: 2, cost: 2, desc: 'L’amiral commence avec +{v} de vétérance par rang', key: 'meta_vet_start' },
    { id: 'adm_lance', branch: 'adm', tier: 3, name: 'Lance affûtée', icon: 'over', max: 3, cost: 3, desc: 'La Lance retire +{p} de la structure de sa cible par rang', key: 'meta_lance_pct', pct: true },
    { id: 'adm_salvo', branch: 'adm', tier: 4, name: 'Salves', icon: 'attack', max: 2, cost: 4, desc: 'L’amiral tire {v} fois de plus par round, par rang', key: 'meta_salvo' },
    { id: 'ks_adm_twin', branch: 'adm', tier: 5, group: 'adm', name: 'Double Lance', icon: 'over', max: 1, cost: 8, desc: 'Deux Lances par bataille' },
    { id: 'ks_adm_mother', branch: 'adm', tier: 5, group: 'adm', name: 'Vaisseau-mère', icon: 'flag', max: 1, cost: 8, desc: 'L’aura de commandement est doublée' },
    // the Ascension branch: paid in shards, earned by winning a run
    { id: 'asc_heritage', branch: 'asc', tier: 1, name: 'Héritage', icon: 'star', max: 3, cost: 1, currency: 'shards', desc: 'Commence avec +1 niveau d’Armement, Boucliers et Blindage par rang' },
    { id: 'asc_reserve', branch: 'asc', tier: 2, name: 'Réserves', icon: 'hydrogen', max: 3, cost: 2, currency: 'shards', desc: 'Hydrogène de base +{v}/h par rang', key: 'asc_hydro' },
    { id: 'asc_yard', branch: 'asc', tier: 2, name: 'Chantiers', icon: 'tower', max: 3, cost: 2, currency: 'shards', desc: '+{v} lasers légers au départ par rang', key: 'asc_yard' },
    { id: 'asc_hunter', branch: 'asc', tier: 3, name: 'Chasseur de boss', icon: 'attack', max: 2, cost: 3, currency: 'shards', desc: 'Dégâts contre les boss +{p} par rang', key: 'asc_boss_hunt', pct: true },
    { id: 'asc_second', branch: 'asc', tier: 3, name: 'Second souffle', icon: 'heart', max: 1, cost: 3, currency: 'shards', desc: 'Une fois par partie, la planète survit à sa chute avec 1 vie' },
    { id: 'asc_doctrine', branch: 'asc', tier: 4, name: 'Doctrine ultime', icon: 'shield', max: 3, cost: 5, currency: 'shards', desc: 'Attaque, boucliers et structure des défenses +{p} par rang', key: 'asc_doctrine', pct: true },
  ],
  // Ascension levels: each one adds its rule to every level below it
  ascension: [
    'Ennemis +10 % de stats',
    'Une vie de moins',
    'Ordres 25 % plus chers',
    'Flottes 10 % plus grosses',
    'Boss 25 % plus forts',
    'Débris −25 %',
    'Compte à rebours de 40 s',
    'Ennemis encore +10 % de stats',
    'Reconstruction −15 %',
    'La partie dure 5 vagues de plus',
  ],
  // Artefacts a downed boss offers (pick one of artifact_choices). key = what it changes, v = by how much.
  artifacts: [
    { id: 'lens',     name: 'Lentille focale',      icon: 'attack',   color: 0xff8a6a, key: 'atk',      v: 0.2,  desc: 'Attaque des défenses +20 %' },
    { id: 'matrix',   name: 'Matrice de bouclier',  icon: 'shield',   color: 0x6fd3ff, key: 'shield',   v: 0.3,  desc: 'Boucliers des défenses +30 %' },
    { id: 'plating',  name: 'Plaques de l’Égide',   icon: 'hull',     color: 0xc9d1dc, key: 'hull',     v: 0.25, desc: 'Structure des défenses +25 %' },
    { id: 'core',     name: 'Cœur d’amiral',        icon: 'flag',     color: 0x9ff0ff, key: 'flag',     v: 0.5,  desc: 'Vaisseau amiral : attaque et structure +50 %' },
    { id: 'cell',     name: 'Cellule d’hydrogène',  icon: 'hydrogen', color: 0x7dffb0, key: 'ordercost', v: 0.4, desc: 'Ordres 40 % moins chers' },
    { id: 'drones',   name: 'Drones récupérateurs', icon: 'debris',   color: 0xd8dde6, key: 'debris',   v: 0.1,  desc: 'Débris récupérés +10 points de part' },
    { id: 'foundry',  name: 'Fonderie automatique', icon: 'metal',    color: 0xf5a83c, key: 'prod',     v: 0.2,  desc: 'Production des mines +20 %' },
    { id: 'nanites',  name: 'Nanites',              icon: 'gear',     color: 0x5ab4ff, key: 'rebuild',  v: 0.15, desc: 'Défenses reconstruites +15 %' },
    { id: 'silence',  name: 'Antenne du Silence',   icon: 'focus',    color: 0xff9ad0, key: 'nojam',    v: 1,    desc: 'Tes ordres ne peuvent plus être brouillés' },
    { id: 'capacitor', name: 'Condensateur',        icon: 'over',     color: 0xffb347, key: 'lance',    v: 1,    desc: 'La Lance de l’amiral tire une fois de plus par bataille' },
    { id: 'trophy',   name: 'Trophée de chasse',    icon: 'star',     color: 0xffd86b, key: 'bosshunt', v: 0.3,  desc: 'Dégâts contre les boss +30 %' },
    { id: 'reflex',   name: 'Ordre réflexe',        icon: 'energy',   color: 0xffd25a, key: 'free',     v: 1,    desc: 'Ton premier ordre de chaque bataille est gratuit' },
    { id: 'clock',    name: 'Chronomètre de siège', icon: 'clock',    color: 0xc59bff, key: 'round',    v: 1,    desc: '+1 round par bataille' },
    { id: 'heart',    name: 'Cœur de réserve',      icon: 'heart',    color: 0xff6457, key: 'life',     v: 1,    desc: '+1 vie (tout de suite)' },
  ],
};

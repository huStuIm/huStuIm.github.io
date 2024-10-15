const events: Record<string, any>[] = [
  {
    "name": "zombie_shuffle",
    "description": "A zombie was seen shuffling around aimlessly, confusing the townsfolk.",
    "event": {
      "event_action": "trigger",
      "payload": {
        "summary": "Zombie Seen Shuffling in the Square",
        "source": "CreepyGraveyard",
        "severity": "info"
      }
    }
  },
  {
    "name": "entity_appear",
    "description": "Entity appears!",
    "event": {
      "event_action": "trigger",
      "payload": {
        "summary": "Entity appears!",
        "source": "LEGOVille",
        "severity": "info"
      }
    }
  },
  {
    "name": "pumpkin_prank",
    "description": "A mischievous pumpkin popped up and startled the citizens.",
    "event": {
      "event_action": "trigger",
      "payload": {
        "summary": "Pumpkin Prankster Strikes Again!",
        "source": "HauntedHollow",
        "severity": "info"
      }
    }
  },
  {
    "name": "ghostly_giggle",
    "description": "A ghost floated by, laughing maniacally and causing minor chaos.",
    "event": {
      "event_action": "trigger",
      "payload": {
        "summary": "Ghostly Giggles Heard in the Distance",
        "source": "SpookyMansion",
        "severity": "info"
      }
    }
  }
];
export default events;
# The Royal Attire — 3D Character & Clothing Integration Guide

This guide documents the technical specifications for creating, rigging, and replacing 3D character models and product-based 3D Sherwani clothing in **The Royal Attire** Shopify section.

---

## 1. 3D Model Format & Guidelines

* **File Format:** GLTF 2.0 Binary (`.glb`) or standard `.gltf` with embedded PBR textures.
* **Coordinate System:** Right-handed Y-up (standard Blender / Three.js).
* **Unit Scale:** 1 unit = 1 meter (character total height ~1.8m to 2.0m including turban).
* **Origin / Pivot:** Ground level `[0, 0, 0]` centered directly between the character's feet/talons.
* **Polygon Budget:** Recommended 15,000 – 45,000 triangles for optimal web performance across desktop and mobile.
* **PBR Texturing:** BaseColor, Metallic-Roughness, Normal map, and Occlusion.

---

## 2. Standard Skeleton Rig & Bone Hierarchy

To ensure the real-time cursor tracking, head swaying, breathing, and modular clothing systems function smoothly across any custom character, the skeleton must use the following standard bone hierarchy:

```
Root (Bone, at [0, 0, 0])
 └── Spine (Bone, at [0, 0.60, 0])
      └── Chest (Bone, at [0, 0.95, 0])
           ├── Attachment_Outfit (Empty/Node, mount point for 3D Sherwanis)
           └── Neck (Bone, at [0, 1.25, 0])
                └── Head (Bone, at [0, 1.45, 0])
                     ├── Attachment_Safa (Empty/Node, mount point for Turbans)
                     └── Attachment_Glasses (Empty/Node, face bridge for Eyewear)
```

### Bone Mapping & Joint Roles:

| Bone Name | Role in Engine | Movement Driven by Code |
| :--- | :--- | :--- |
| `Root` | Ground anchor & pedestal contact | Stationary, holds floor contact |
| `Spine` | Lower torso & dhoti/legs | Subtle breathing translation & 360° orbit |
| `Chest` | Upper ribcage & shoulders | Rhythmic idle breathing chest expansion |
| `Neck` | Neck articulation & twist | Smooth secondary yaw & pitch rotation ($40\%$ of head angle) |
| `Head` | Head, eyes, beak, turban, glasses | Primary gaze tracking (yaw $\pm 28^\circ$, pitch $\pm 14^\circ$, roll tilt) |

---

## 3. Modular 3D Clothing & Sherwani System

Each Shopify Sherwani product can have its own tailored 3D outfit model:
* **Current Pre-Built 3D Outfits:**
  * `sherwani-maroon.glb` (Ruby/Maroon ceremonial silk with antique gold zardozi)
  * `sherwani-blue.glb` (Royal Sapphire Blue brocade sherwani)
  * `sherwani-ivory.glb` (Imperial Ivory & Champagne Zari sherwani)
  * `sherwani-emerald.glb` (Heritage Emerald Green coat)
* **How Outfits Attach:**
  * When a customer selects a Sherwani product in the gallery, Three.js loads the matching outfit `.glb` and attaches it to the character's `Attachment_Outfit` / `Chest` bone.
  * This guarantees the clothing deforms and breathes with the character without detaching or clipping.

---

## 4. How to Replace the 3D Character Model in Shopify

You do **not** need to touch any Liquid, CSS, or JavaScript code to replace the character model:

1. Export your rigged 3D model as `.glb` from Blender, Maya, or 3ds Max.
2. In your Shopify Admin, navigate to **Content > Files**.
3. Click **Upload files** and select your `.glb` character model.
4. Once uploaded, copy the link URL (e.g. `https://cdn.shopify.com/s/files/.../my-custom-character.glb`).
5. Go to **Online Store > Themes > Customize**.
6. Select the **The Royal Attire** section on the homepage.
7. Paste your link into the **"Custom 3D Character Model URL (.glb)"** field under the *Replaceable 3D Character Model* settings group.
8. Click **Save**. The 3D engine will instantly load your new character, bind its head and neck bones to the cursor tracking, and enable 360° interactive rotation.


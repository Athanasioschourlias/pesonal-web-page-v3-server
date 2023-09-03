terraform {
  required_providers {
    hcloud = {
      source = "hetznercloud/hcloud"
    }
    cloudflare = {
      source = "cloudflare/cloudflare"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "hcloud_ssh_key" "npm" {
  name       = "npm"
  public_key = file(var.hcloud_ssh_key)
}

resource "hcloud_server" "npm" {
  name        = "npm-server"
  server_type = "cx11"
  image       = "ubuntu-20.04"
  location    = "fsn1"
  ssh_keys    = [hcloud_ssh_key.npm.id]
}

resource "cloudflare_record" "npm_dns" {
  depends_on  = [hcloud_server.npm]
  zone_id     = var.cloudflare_zone_id
  name        = var.domain_name
  value       = hcloud_server.npm.ipv4_address
  type        = "A"
  ttl         = 1
  proxied     = false
}

resource "null_resource" "npm_ansible_setup" {
  depends_on = [cloudflare_record.npm_dns]

  provisioner "file" {
    source      = "install.sh"
    destination = "/tmp/install.sh"
    
    connection {
      type        = "ssh"
      user        = "root"
      private_key = file(var.hcloud_ssh_key_private)
      host        = hcloud_server.npm.ipv4_address
    }
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/install.sh",
      "/tmp/install.sh"
    ]

    connection {
      type        = "ssh"
      user        = "root"
      private_key = file(var.hcloud_ssh_key_private)
      host        = hcloud_server.npm.ipv4_address
    }
  }
}
